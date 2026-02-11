import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user.service';
import { registerSchema } from '@/lib/validators/user.validator';
import { ValidationError, ConflictError } from '@/lib/utils/errors';
import { rateLimit } from '@/lib/utils/rateLimit';

const userService = new UserService();

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  const rateLimitResult = rateLimit.register(ip);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many registration attempts. Please try again later.',
      },
      {
        status: 429,
        headers: {
          'RateLimit-Remaining': '0',
          'RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );
  }

  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);

    const user = await userService.register(validated);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar_url: user.avatar_url,
          github_username: user.github_username,
        },
      },
      {
        status: 201,
        headers: {
          'RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 400,
          headers: {
            'RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    if (error instanceof ConflictError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 409,
          headers: {
            'RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong',
      },
      {
        status: 500,
        headers: {
          'RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );
  }
}
