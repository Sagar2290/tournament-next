import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const updateUser = await prisma.user.update({
      where: {
        id: params.id,
        role: 'player' 
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
        { error: "Player not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updateUser, { status: 200 });

  } catch (error) {
    console.error("Error update player:", error);
    return NextResponse.json(
      { error: "Failed to update player" },
      { status: 500 }
    );
  } 
}