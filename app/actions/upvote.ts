"use server";

import { revalidatePath } from "next/cache";
import { redis } from "@/lib/redis";
import { auth } from "@/auth";
import { getProjectVotesQuery, getTeamVotesQuery } from "@/lib/queries";

const REDIS_KEY = "project:votes";

/**
 * Fetch all project votes
 * Returns a dictionary mapping projectId to its vote count
 */
export async function getProjectVotes(): Promise<Record<number, number>> {
  return getProjectVotesQuery();
}

/**
 * Fetch project IDs that the current user has already voted for
 */
export async function getUserVotedProjectIds(): Promise<number[]> {
  if (!redis) return [];
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) return [];
    
    const userId = session.user.email;
    // We fetch all keys for this user's project votes
    const keys = await redis.keys(`user:${userId}:voted_project_*`);
    if (!keys || keys.length === 0) return [];
    
    const projectIds = keys.map(key => {
      const parts = key.split('_project_');
      return Number(parts[1]);
    });
    
    return projectIds;
  } catch (error) {
    console.error("Error fetching user voted projects:", error);
    return [];
  }
}

/**
 * Increment a project's vote count by 1
 */
export async function upvoteProject(projectId: number) {
  if (!redis) {
    return { success: false, error: "Redis is not configured." };
  }
  
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return { success: false, error: "Unauthorized. Please sign in to vote.", triggerAuth: true };
    }
    
    const userId = session.user.email; // Using email as unique ID
    const voteKey = `user:${userId}:voted_project_${projectId}`;
    
    // Check if user already voted for this project
    const hasVoted = await redis.get(voteKey);
    if (hasVoted) {
      return { success: false, error: "You have already voted for this project." };
    }

    const newVotes = await redis.hincrby(REDIS_KEY, projectId.toString(), 1);
    
    // Mark as voted in redis permanently
    await redis.set(voteKey, "true");

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
  return getTeamVotesQuery(memberId);
}

/**
 * Increment a team member's vote count
 */
export async function upvoteTeamMember(memberId: string) {
  if (!redis) {
    return { success: false, error: "Redis is not configured." };
  }
  
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return { success: false, error: "Unauthorized. Please sign in to vote.", triggerAuth: true };
    }
    
    const userId = session.user.email;
    const voteKey = `user:${userId}:voted_team_${memberId}`;
    
    const hasVoted = await redis.get(voteKey);
    if (hasVoted) {
      return { success: false, error: "You have already voted for this team member." };
    }

    const newVotes = await redis.hincrby(TEAM_REDIS_KEY, memberId, 1);
    
    await redis.set(voteKey, "true");

    revalidatePath("/teams");
    return { success: true, votes: newVotes };
  } catch (error) {
    console.error(`Error upvoting team member ${memberId}:`, error);
    return { success: false, error: "Failed to upvote team member" };
  }
}
