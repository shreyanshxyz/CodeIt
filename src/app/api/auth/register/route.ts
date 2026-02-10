import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user.service';
import { registerSchema } from '@/lib/validators/user.validator';
import { ValidationError, ConflictError } from '@/lib/utils/errors';

const userService = new UserService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);

    const user = await userService.register(validated);

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
        github_username: user.github_username,
      },
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({
        success: false,
        error: error.message,
      }, { status: 400 });
    }

    if (error instanceof ConflictError) {
      return NextResponse.json({
        success: false,
        error: error.message,
      }, { status: 409 });
    }

    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      error: 'Something went wrong',
    }, { status: 500 });
  }
}
