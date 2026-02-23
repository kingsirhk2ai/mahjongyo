import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const booking = await prisma.booking.findUnique({
      where: { id }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if user owns this booking (or is admin - simplified for now)
    if (booking.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Check if booking is in the future
    const now = new Date()
    const bookingDate = new Date(booking.date + 'T' + booking.startTime)

    if (bookingDate < now) {
      return NextResponse.json(
        { error: 'Cannot cancel past bookings' },
        { status: 400 }
      )
    }

    // Cancel booking and refund to balance in a transaction
    const user = await prisma.user.findUnique({
      where: { id: booking.userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await prisma.$transaction([
      // Update booking status to cancelled
      prisma.booking.update({
        where: { id },
        data: { status: 'cancelled' }
      }),
      // Refund to user balance
      prisma.user.update({
        where: { id: user.id },
        data: { balance: user.balance + booking.amount },
      }),
      // Create refund transaction
      prisma.transaction.create({
        data: {
          userId: user.id,
          type: 'refund',
          amount: booking.amount,
          description: `Refund: ${booking.date} ${booking.startTime}-${booking.endTime}`,
        },
      }),
    ])

    return NextResponse.json({
      message: 'Booking cancelled successfully',
      refundedAmount: booking.amount
    })
  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    )
  }
}
