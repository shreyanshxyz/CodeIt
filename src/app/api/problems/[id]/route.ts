import { NextResponse } from 'next/server';
import { ProblemService } from '@/lib/services/problem.service';
import { NotFoundError } from '@/lib/utils/errors';
import { auth } from '@/lib/auth';

const problemService = new ProblemService();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await auth();
    const userId = session?.user?.id;

    const problem = await problemService.getById(id, userId);

    return NextResponse.json({
      success: true,
      data: problem,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    console.error('Get problem error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problem' },
      { status: 500 }
    );
  }
}
