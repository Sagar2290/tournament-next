"use client";

import React, { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/utiles/helper";
import { useParams } from "next/navigation";

interface eventData {
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  dueDate: string | null;
  address: string | null;
  zipCode: string | null;
  email: string | null;
  country: string | null;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().min(1, "End Date is required"),
  dueDate: z.string().min(1, "Due Date is required"),
  address: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "Zip Code is required"),
  email: z.string().email("Invalid email address"),
});

export default function EventFormPage({ data }: { data?: eventData }) {
  const params = useParams();
  const eventId = params?.id;

  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ? data.name : "",
      startDate: data?.startDate ? data.startDate : "",
      endDate: data?.endDate ? data.endDate : "",
      dueDate: data?.dueDate ? data.dueDate : "",
      address: data?.address ? data.address : "",
      zipCode: data?.zipCode ? data.zipCode : "",
      email: data?.email ? data.email : "",
    },
  });

  // Fetch event data if in edit mode
  useEffect(() => {
    if (eventId) {
      setLoading(true);
      // Simulate fetching data (replace with actual API call)
      setTimeout(() => {
        const eventData = {
          name: "Sample Event",
          startDate: "2025-01-01",
          endDate: "2025-01-10",
          dueDate: "2025-01-15",
          address: "123 Main St",
          zipCode: "12345",
          email: "event@example.com",
          country: "US",
        };
        form.reset(eventData);
        setSelectedCountry(eventData.country);
        setLoading(false);
      }, 1000);
    }
  }, [eventId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
    debugger;
    if (eventId) {
      console.log("Updating event:", eventId);
      // Perform update API call
    } else {
      console.log("Adding new event");
      // Perform add API call
    } // Redirect after save
  };

  return (
    <div className="card w-full p-3">
      <h2 className="text-lg font-semibold mb-4">
        {eventId ? "Edit Event" : "Add Event"}
      </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Zip code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="city">City</Label>
                <Input id="city" required />
              </div>
              <div className="flex-1">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
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
              </div>
            </div>

            <Button type="submit">{eventId ? "Update" : "Save"}</Button>
          </form>
        </Form>
    </div>
  );
}
