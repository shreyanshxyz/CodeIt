import { NextResponse } from 'next/server';
import { AchievementService } from '@/lib/services/achievement.service';
import { auth } from '@/lib/auth';

const achievementService = new AchievementService();

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await achievementService.getAllAchievementsWithStatus(session.user.id);

    return NextResponse.json({
      success: true,
      data: {
        earned: result.earned,
        locked: result.locked,
        totalEarned: result.earned.length,
        totalPossible: result.earned.length + result.locked.length,
      },
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch achievements' },
      { status: 500 }
    );
  }
}
