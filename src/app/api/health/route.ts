import { NextResponse } from 'next/server';
import db from '@/lib/db/connection';

export async function GET() {
  try {
    const dbHealth = await db.healthCheck();
    
    const health = {
      status: dbHealth ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        connected: dbHealth,
      },
      environment: process.env.NODE_ENV,
    };

    const statusCode = dbHealth ? 200 : 503;

    return NextResponse.json(health, { status: statusCode });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
