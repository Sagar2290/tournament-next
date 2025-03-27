// app/api/organizers/[id]/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: params.id,
          //role: 'organizer' // Ensure we're only fetching organizers
        }
      });
  
      if (!user) {
        return NextResponse.json(
          { error: "Organizer not found" },
          { status: 404 }
        );
      }
  
      // Return the user as JSON
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error("Error fetching organizer:", error);
      return NextResponse.json(
        { error: "Failed to fetch organizer" },
        { status: 500 }
      );
    } 
}