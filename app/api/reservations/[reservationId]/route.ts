import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb'

type IParams = {
  reservationId: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {

  const currentUser = await getCurrentUser();
  if (!currentUser)
    return new NextResponse('Unauthorized', { status: 401 })

  const result = await prisma.reservation.delete({
    where: {
      id: params.reservationId
    }
  })

  return NextResponse.json(result);
}