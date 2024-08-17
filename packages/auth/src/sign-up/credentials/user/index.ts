import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (_request: NextRequest) => {
    // todo: add implemintaion

    await new Promise(resolve => setTimeout(resolve, 500));

    return new NextResponse(undefined, { status: 201 });
};
