import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    const updateOrganisation = await prisma.user.update({
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

    if (!updateOrganisation) {
      return NextResponse.json(
        { error: "Organizer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updateOrganisation, { status: 200 });

  } catch (error) {
    console.error("Error update organizer:", error);
    return NextResponse.json(
      { error: "Failed to update organizer" },
      { status: 500 }
    );
  } 
}