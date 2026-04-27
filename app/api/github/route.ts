import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get('endpoint'); 

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`https://api.github.com/${endpoint}`, {
      headers,
      // GitHub stats endpoints can be cached to avoid excessive API calls
      next: { revalidate: 3600 }, 
    });

    if (response.status === 202) {
      return NextResponse.json({ message: 'Data is being processed by GitHub' }, { status: 202 });
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error occurred' }, { status: 500 });
  }
}
