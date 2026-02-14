import { NextRequest, NextResponse } from 'next/server';
import { ProblemService } from '@/lib/services/problem.service';
import { problemQuerySchema } from '@/lib/validators/problem.validator';
import { auth } from '@/lib/auth';

const problemService = new ProblemService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'filters') {
      const filterOptions = await problemService.getFilterOptions();
      return NextResponse.json({
        success: true,
        data: filterOptions,
      });
    }

    const query = problemQuerySchema.parse(Object.fromEntries(searchParams));

    const session = await auth();
    const userId = session?.user?.id;

    const result = await problemService.getAll({
      difficulty: query.difficulty,
      category: query.category,
      tag: query.tag,
      search: query.search,
      sort: query.sort,
      sortOrder: query.sortOrder,
      page: query.page,
      limit: query.limit,
      userId,
    });

    return NextResponse.json({
      success: true,
      data: result.problems,
      total: result.total,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Get problems error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    const errorName = error instanceof Error ? error.constructor.name : 'Error';
    
    console.error('Error details:', {
      name: errorName,
      message: errorMessage,
      stack: errorStack,
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch problems',
        details: {
          name: errorName,
          message: errorMessage,
          stack: process.env.NODE_ENV !== 'production' ? errorStack : undefined,
        }
      },
      { status: 500 }
    );
  }
}
