import { NextResponse, type NextRequest } from "next/server";

const REPO_PATH_PATTERN = "[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+";
const ALLOWED_ENDPOINTS = [
  new RegExp(`^repos/${REPO_PATH_PATTERN}/contributors$`),
  new RegExp(`^repos/${REPO_PATH_PATTERN}/stats/commit_activity$`),
  new RegExp(`^repos/${REPO_PATH_PATTERN}/stats/contributors$`),
  new RegExp(`^repos/${REPO_PATH_PATTERN}/stats/punch_card$`),
];

function parseAllowedEndpoint(rawEndpoint: string) {
  const endpoint = rawEndpoint.trim().replace(/^\/+/, "");
  const parts = endpoint.split("?");

  if (parts.length > 2 || !parts[0] || endpoint.includes("..") || endpoint.includes("//")) {
    return null;
  }

  const [path, queryString = ""] = parts;

  if (!ALLOWED_ENDPOINTS.some((pattern) => pattern.test(path))) {
    return null;
  }

  const params = new URLSearchParams(queryString);
  const allowsPerPage = path.endsWith("/contributors");
  for (const [key, value] of params) {
    if (!allowsPerPage || key !== "per_page") return null;

    const perPage = Number(value);
    if (!Number.isInteger(perPage) || perPage < 1 || perPage > 100) {
      return null;
    }
  }

  const url = new URL(`https://api.github.com/${path}`);
  params.forEach((value, key) => url.searchParams.set(key, value));
  return url;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint parameter is required" }, { status: 400 });
  }

  const githubUrl = parseAllowedEndpoint(endpoint);
  if (!githubUrl) {
    return NextResponse.json({ error: "GitHub endpoint is not allowed" }, { status: 403 });
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "kerala-coders-cafe",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Keep this proxy narrow so a public query parameter cannot call arbitrary GitHub APIs.
    const response = await fetch(githubUrl, {
      headers,
      // GitHub stats endpoints can be cached to avoid excessive API calls
      next: { revalidate: 3600 },
    });

    if (response.status === 202) {
      return NextResponse.json({ message: "Data is being processed by GitHub" }, { status: 202 });
    }

    if (!response.ok) {
      // Pass the 403 status back so the client knows it's rate limited if there's no token
      return NextResponse.json(
        { error: `GitHub API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
