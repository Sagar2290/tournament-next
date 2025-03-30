import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
          role: 'organizer'
        }
      });
  
      if (!user) {
        return NextResponse.json(
          { error: "Organizer not found" },
          { status: 404 }
        );
      }
     
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error("Error fetching organizer:", error);
      return NextResponse.json(
        { error: "Failed to fetch organizer" },
        { status: 500 }
      );
    } 
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const updateUser = await prisma.user.update({
      where: {
        id: params.id,
        role: 'organizer' 
      },
      data:{
        name: body.name,
        city: body.city,
        phone:body.phone
        //userImage:body.userImage
      }
    });

    if (!updateUser) {
      return NextResponse.json(
        { error: "Organizer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updateUser, { status: 200 });

  } catch (error) {
    console.error("Error update organizer:", error);
    return NextResponse.json(
      { error: "Failed to update organizer" },
      { status: 500 }
    );
  } 
}