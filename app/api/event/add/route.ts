import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Convert string dates to Date objects
    const eventData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      dueDate: new Date(data.dueDate),
    }

    const event = await prisma.event.create({
      data: eventData
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    )
  }
}