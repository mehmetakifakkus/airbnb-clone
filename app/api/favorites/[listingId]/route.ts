import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb'

export async function POST(request: Request, { params: { listingId } }: { params: { listingId: string } }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  let favoriteIds = currentUser.favoriteIds || [];
  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })
  return NextResponse.json(user)
}


export async function DELETE(request: Request, { params: { listingId } }: { params: { listingId: string } }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  let favoriteIds = currentUser.favoriteIds || [];
  favoriteIds = favoriteIds.filter(id => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })
  return NextResponse.json(user)
}