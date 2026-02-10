import { NextRequest, NextResponse } from 'next/server';
import { SubmissionService } from '@/lib/services/submission.service';
import { createSubmissionSchema } from '@/lib/validators/submission.validator';
import { auth } from '@/lib/auth';

const submissionService = new SubmissionService();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createSubmissionSchema.parse(body);

    const result = await submissionService.create(session.user.id, validatedData);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Create submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get('problem_id') || undefined;
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await submissionService.getByUser(session.user.id, {
      problemId,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: result.submissions,
      total: result.total,
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
