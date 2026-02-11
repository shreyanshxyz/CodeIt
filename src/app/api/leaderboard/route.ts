import { NextRequest, NextResponse } from 'next/server';
import { LeaderboardService } from '@/lib/services/leaderboard.service';

const leaderboardService = new LeaderboardService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));

    const result = await leaderboardService.getGlobal(page, limit);

    return NextResponse.json({
      success: true,
      data: result.entries,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
