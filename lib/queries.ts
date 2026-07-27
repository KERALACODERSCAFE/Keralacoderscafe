import { redis } from "@/lib/redis";

const REDIS_KEY = "project:votes";
const TEAM_REDIS_KEY = "team:votes";

/**
 * Fetch all project votes (For Server Components)
 */
export async function getProjectVotesQuery(): Promise<Record<number, number>> {
  if (!redis) {
    return {};
  }
  try {
    const votes = await redis.hgetall<Record<string, number>>(REDIS_KEY);

    if (!votes) return {};

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

/**
 * Fetch votes for a specific team member (For Server Components)
 */
export async function getTeamVotesQuery(memberId: string): Promise<number> {
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
