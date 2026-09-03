import { NextResponse } from "next/server";

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "varun_s04";

  const fallbackData = {
    status: "success",
    username,
    totalSolved: 209,
    totalQuestions: 3379,
    easySolved: 71,
    totalEasy: 864,
    mediumSolved: 113,
    totalMedium: 1782,
    hardSolved: 25,
    totalHard: 733,
    acceptanceRate: 64.5,
    ranking: 806011,
    contributionPoints: 0,
    reputation: 0,
    profileUrl: `https://leetcode.com/u/${username}/`,
    avatar: "https://assets.leetcode.com/users/avatars/avatar_1690000000.png",
    lastUpdated: new Date().toISOString(),
    isFallback: true,
  };

  try {
    // 1. Try public LeetCode stats API service
    const statsRes = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      { next: { revalidate: 300 } }
    );

    if (statsRes.ok) {
      const data = await statsRes.json();
      if (data.status === "success" && typeof data.totalSolved === "number") {
        return NextResponse.json({
          ...data,
          username,
          profileUrl: `https://leetcode.com/u/${username}/`,
          lastUpdated: new Date().toISOString(),
          isFallback: false,
        });
      }
    }

    // 2. Try direct LeetCode GraphQL
    const gqlQuery = {
      query: `
        query userPublicProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
              userAvatar
              realName
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const gqlRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gqlQuery),
      next: { revalidate: 300 },
    });

    if (gqlRes.ok) {
      const gqlData = await gqlRes.json();
      const user = gqlData?.data?.matchedUser;
      if (user) {
        const stats = user.submitStats?.acSubmissionNum || [];
        const allCount = stats.find((s: any) => s.difficulty === "All")?.count || 209;
        const easyCount = stats.find((s: any) => s.difficulty === "Easy")?.count || 71;
        const mediumCount = stats.find((s: any) => s.difficulty === "Medium")?.count || 113;
        const hardCount = stats.find((s: any) => s.difficulty === "Hard")?.count || 25;

        return NextResponse.json({
          status: "success",
          username,
          totalSolved: allCount,
          easySolved: easyCount,
          mediumSolved: mediumCount,
          hardSolved: hardCount,
          ranking: user.profile?.ranking || 806011,
          reputation: user.profile?.reputation || 0,
          avatar: user.profile?.userAvatar || fallbackData.avatar,
          profileUrl: `https://leetcode.com/u/${username}/`,
          lastUpdated: new Date().toISOString(),
          isFallback: false,
        });
      }
    }
  } catch (err) {
    console.error("Failed to fetch LeetCode stats:", err);
  }

  // Return fallback data if live fetch fails
  return NextResponse.json(fallbackData);
}
