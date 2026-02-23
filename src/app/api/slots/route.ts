import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getNowHK } from '@/lib/hktime'

const OPERATING_HOURS = {
  start: 0,
  end: 24  // 24 hours
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 })
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
  }

  try {
    // Get all paid or pending bookings for this date
    const bookings = await prisma.booking.findMany({
      where: {
        date,
        status: { not: 'cancelled' }
      },
      select: { startTime: true }
    })

    const bookedTimes = new Set(bookings.map(b => b.startTime))

    const nowHK = getNowHK()
    const isToday = date === nowHK.date

    const slots = []
    for (let hour = OPERATING_HOURS.start; hour < OPERATING_HOURS.end; hour++) {
      const startTime = `${String(hour).padStart(2, '0')}:00`
      const endTime = `${String(hour + 1).padStart(2, '0')}:00`

      const isBooked = bookedTimes.has(startTime)
      const isPast = isToday && hour <= nowHK.hour
      const available = !isBooked && !isPast

      slots.push({ startTime, endTime, available, isPast, isBooked })
    }

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Error fetching slots:', error)
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 })
  }
}
