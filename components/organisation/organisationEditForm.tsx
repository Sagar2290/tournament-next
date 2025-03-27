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

interface organisationData {
  name: string | null;
  firstName: string | null;
  email: string | null;
  city: string | null;
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  name: z.string().min(1, "Name is required"),
  city: z.string().min(1, "City is required"),
});

export default function OrganisationPage({data}:{data?:organisationData}) {
  // Initialize the form
  const params = useParams();
    const organisationId = params?.id;
      const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data?.email ? data.email : "",
      firstName: data?.firstName ? data.firstName : "",
      name: data?.name ? data.name : "",
      city: data?.city ? data.city : "",
    },
  });

   useEffect(() => {
      if (organisationId) {
        setLoading(true);
        // Simulate fetching data (replace with actual API call)
        setTimeout(() => {
          const organisationData = {
            name: "Sample Event",
            email: "event@example.com",
            firstName:"subhav",
            city: "Amd",
          };
          form.reset(organisationData);
          setLoading(false);
        }, 1000);
      }
    }, [organisationId, form]);

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (organisationId) {
    console.log("Form values:", values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}