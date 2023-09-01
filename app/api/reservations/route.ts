
import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb'

export async function POST(request: Request) {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const body = await request.json()

  const data = {
    ...body,
    userId: currentUser.id,
  }

  const reservation = await prisma.reservation.create({ data })

  return NextResponse.json(reservation)
}