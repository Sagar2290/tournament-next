import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend("re_WNT4L2Mu_26jeeubXZs6BSgh59qwZMPHx");

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Invitation to join',
      html: '<p>You have been invited!</p>',
    });
    console.log("Dataaaaaaaaaaaaaaaa",data)
    if (error) {
        console.log("aaaaaaaaaaaaa",error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${email}`,
      data
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}