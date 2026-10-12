import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const tag = request.nextUrl.searchParams.get("tag");

  try {
    if (tag) {
      revalidateTag(tag, { expire: 0 });
    }

    if (path) {
      revalidatePath(path);
    } else {
      // Revalidate careers, blog, and home by default
      revalidatePath("/careers");
      revalidatePath("/blog");
      revalidatePath("/");
    }

    // Also revalidate tags
    revalidateTag("jobs", { expire: 0 });
    revalidateTag("blogs", { expire: 0 });

    return NextResponse.json({
      revalidated: true,
      message: "Cache successfully revalidated on demand",
      path: path || "all (/careers, /blog, /)",
      tag: tag || "jobs, blogs",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { revalidated: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
