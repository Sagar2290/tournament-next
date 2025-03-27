import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
      const users = await prisma.user.findMany({
        where: {
          role: 'organizer' // This will filter users with organization role
        }
      });
  
      // Return the users as JSON
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    } 
  }