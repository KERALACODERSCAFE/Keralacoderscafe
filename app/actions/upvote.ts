"use server";

import { revalidatePath } from "next/cache";
import { redis } from "@/lib/redis";

const REDIS_KEY = "project:votes";

/**
 * Fetch all project votes
 * Returns a dictionary mapping projectId to its vote count
 */
export async function getProjectVotes(): Promise<Record<number, number>> {
  if (!redis) {
    return {};
  }
  try {
    const votes = await redis.hgetall<Record<string, number>>(REDIS_KEY);
    
    if (!votes) return {};

    // Convert string keys to numbers
    const formattedVotes: Record<number, number> = {};
    for (const [key, value] of Object.entries(votes)) {
      formattedVotes[Number(key)] = Number(value);
    }
    
    return formattedVotes;
  } catch (error) {
    console.error("Error fetching project votes from Redis:", error);
    return {};
  }
}

import { cookies } from "next/headers";

/**
 * Increment a project's vote count by 1
 */
export async function upvoteProject(projectId: number) {
  if (!redis) {
    return { success: false, error: "Redis is not configured." };
  }
  
  try {
    const cookieStore = await cookies();
    const cookieName = `voted_project_${projectId}`;
    
    if (cookieStore.get(cookieName)) {
      return { success: false, error: "Already voted" };
    }

    const newVotes = await redis.hincrby(REDIS_KEY, projectId.toString(), 1);
    
    cookieStore.set(cookieName, "true", { maxAge: 60 * 60 * 24 * 365 }); // 1 year

    // Revalidate the paths where the projects are displayed
    revalidatePath("/projects");
    revalidatePath("/");
    
    return { success: true, votes: newVotes };
  } catch (error) {
    console.error(`Error upvoting project ${projectId}:`, error);
    return { success: false, error: "Failed to upvote project" };
  }
}

const TEAM_REDIS_KEY = "team:votes";

/**
 * Fetch votes for a specific team member
 */
export async function getTeamVotes(memberId: string): Promise<number> {
  if (!redis) {
    return 0;
  }
  try {
    const votes = await redis.hget(TEAM_REDIS_KEY, memberId);
    return votes ? Number(votes) : 0;
  } catch (error) {
    console.error(`Error fetching votes for team member ${memberId}:`, error);
    return 0;
  }
}

/**
 * Increment a team member's vote count
 */
export async function upvoteTeamMember(memberId: string) {
  if (!redis) {
    return { success: false, error: "Redis is not configured." };
  }
  
  try {
    const cookieStore = await cookies();
    const cookieName = `voted_team_${memberId}`;
    
    if (cookieStore.get(cookieName)) {
      return { success: false, error: "Already voted" };
    }

    const newVotes = await redis.hincrby(TEAM_REDIS_KEY, memberId, 1);
    
    cookieStore.set(cookieName, "true", { maxAge: 60 * 60 * 24 * 365 }); // 1 year

    revalidatePath("/teams");
    return { success: true, votes: newVotes };
  } catch (error) {
    console.error(`Error upvoting team member ${memberId}:`, error);
    return { success: false, error: "Failed to upvote team member" };
  }
}
