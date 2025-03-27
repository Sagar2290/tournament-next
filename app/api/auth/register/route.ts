import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { any } from 'zod'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body,"body")
        const {
            email,
            password,
            name,
            phone,
            city,
            state,
            country,
            pincode,
            invitedById,
            userImage,
            role = "USER" // Default role if not provided
        } = body;

        // Validate required fields
        if (!email || !password || !name || !phone || !city || !state || !country || !pincode) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with all required fields
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone: Number(phone),
                city,
                state,
                country,
                pincode: Number(pincode),
                isActive: true,
                invitedById: invitedById || null,
                userImage: userImage || null,
                role // Include the role field
            }
        });

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json(
            { user: userWithoutPassword, message: "User created successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}