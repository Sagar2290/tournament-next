"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

interface playersData {
    name: string | null;
    phone: number | null;
    email: string | null;
    city: string | null;
}

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    phone: z.coerce.number().min(1, "Phone number is required"), // Using coerce to convert string to number
    name: z.string().min(1, "Name is required"),
    city: z.string().min(1, "City is required"),
});

export default function PlayersPage({ data }: { data?: playersData }) {
    // Initialize the form
    const params = useParams();

    const playerId = params?.id;
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: data?.email || "",
            phone: data?.phone || undefined,
            name: data?.name || "",
            city: data?.city || "",
        },
    });

    useEffect(() => {
        if (data) {
            form.reset({
                email: data.email || "",
                phone: data.phone || undefined,
                name: data.name || "",
                city: data.city || "",
            });
        }
    }, [data, form]);


    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (playerId) {
            setLoading(true);

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/player/edit/${playerId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                    }
                );

                if (response.ok) {
                    data = await response.json();
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch organizer');
                }
            } catch (error) {
                console.error("Error fetching organizer:", error);
            }
        }
    }

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/admin/organisation">Organisation</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter email" {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex space-x-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Organisation Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="Enter phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter city" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="justify-end flex">
                        <Button type="submit" disabled={loading}>

                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}