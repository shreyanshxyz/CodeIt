import { NextRequest, NextResponse } from 'next/server';
import { ProblemService } from '@/lib/services/problem.service';
import { problemQuerySchema } from '@/lib/validators/problem.validator';
import { auth } from '@/lib/auth';

const problemService = new ProblemService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = problemQuerySchema.parse(Object.fromEntries(searchParams));

    const session = await auth();
    const userId = session?.user?.id;

    const result = await problemService.getAll({
      difficulty: query.difficulty,
      category: query.category,
      page: query.page,
      limit: query.limit,
      userId,
    });

    return NextResponse.json({
      success: true,
      data: result.problems,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Get problems error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}
