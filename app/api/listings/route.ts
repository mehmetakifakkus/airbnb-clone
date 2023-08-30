
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
    locationValue: body.location?.value || 'TR',
    price: parseInt(body.price, 10)
  }
  delete data?.location
  delete data?.country

  const listing = await prisma.listing.create({ data })

  return NextResponse.json(listing)
}