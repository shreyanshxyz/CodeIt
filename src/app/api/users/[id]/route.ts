import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user.service';
import { ProgressService } from '@/lib/services/progress.service';
import { AchievementService } from '@/lib/services/achievement.service';
import { SubmissionService } from '@/lib/services/submission.service';
import { auth } from '@/lib/auth';
import { updateUserSchema } from '@/lib/validators/user.validator';
import { NotFoundError, ValidationError } from '@/lib/utils/errors';

const userService = new UserService();
const progressService = new ProgressService();
const achievementService = new AchievementService();
const submissionService = new SubmissionService();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await userService.getById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const [stats, achievements, { submissions }] = await Promise.all([
      progressService.getUserStats(id),
      achievementService.getUserAchievements(id),
      submissionService.getByUser(id, { limit: 10 }),
    ]);

    const publicUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
      github_username: user.github_username,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return NextResponse.json({
      success: true,
      data: {
        user: publicUser,
        stats,
        achievements,
        recentSubmissions: submissions,
      },
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (session.user.id !== id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = updateUserSchema.parse(body);

    const updatedUser = await userService.update(id, validated);

    const publicUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar_url: updatedUser.avatar_url,
      github_username: updatedUser.github_username,
      role: updatedUser.role,
      created_at: updatedUser.created_at,
      updated_at: updatedUser.updated_at,
    };

    return NextResponse.json({
      success: true,
      data: publicUser,
    });
  } catch (error) {
    console.error('Update user profile error:', error);

    if (error instanceof ValidationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
