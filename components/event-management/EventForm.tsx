"use client";

import React, { useEffect, useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { countries } from "@/utiles/helper";
import { useParams } from "next/navigation";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import Link from "next/link"

interface eventData {
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  dueDate: string | null;
  address: string | null;
  pincode: number | null;
  email: string | null;
  city: string | null;
  country: string | null;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  dueDate: z.string().min(1, "Due Date is required"),
  address: z.string().min(1, "Address is required"),
  pincode: z.coerce.number().min(1, "Zip Code is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

export default function EventFormPage({ data }: { data?: eventData }) {
  const params = useParams();
  const eventId = params?.id;
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      startDate: data?.startDate || "",
      endDate: data?.endDate || "",
      dueDate: data?.dueDate || "",
      address: data?.address || "",
      pincode: data?.pincode || undefined,
      email: data?.email || "",
      city: data?.city || "",
      country: data?.country || ""
    },
  });

  useEffect(() => { console.log(data, form) }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
    debugger;
    if (eventId) {
      console.log("Updating event:", eventId);
      // Perform update API call
    } else {
      try {    
        console.log("values")    
        const method = 'POST';
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/event/add`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save event');
        }
  
        const result = await response.json();
        console.log('Success:', result);
        router.push('/admin/event-management');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
     
    } 
  };

  return (
    <div className="card w-full p-3">
      <Breadcrumb >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/event-management">Event</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage> {eventId ? "Edit Event" : "Add Event"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-5">
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Pin code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-1">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Countries</SelectLabel>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">{eventId ? "Update" : "Save"}</Button>
        </form>
      </Form>
    </div>
  );
}
