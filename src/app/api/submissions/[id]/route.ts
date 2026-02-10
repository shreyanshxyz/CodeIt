import { NextResponse } from 'next/server';
import { SubmissionService } from '@/lib/services/submission.service';
import { NotFoundError } from '@/lib/utils/errors';
import { auth } from '@/lib/auth';

const submissionService = new SubmissionService();

export async function GET(
  request: Request,
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
    const submission = await submissionService.getById(id, session.user.id);

    return NextResponse.json({
      success: true,
      data: submission,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );
    }

    console.error('Get submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submission' },
      { status: 500 }
    );
  }
}
