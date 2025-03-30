import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
      const eventData = await prisma.event.findMany();
  console.log("eventData,,,,,,,,,,,,,,,,,,,,",eventData)
      // Return the users as JSON
      return NextResponse.json(eventData, { status: 200 });
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    } 
  }