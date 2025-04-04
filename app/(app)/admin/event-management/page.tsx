import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Page() {
  let error = false;
  let eventsData: any;
  try {
    eventsData = await prisma.event.findMany();
  } catch (err) {
    console.error("Error fetching events:", err);
    error = true;
  }

  if (error) {
    return (
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
      </div>
    );
  }

  return (
    <div className="card w-full p-3">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold">Event Management</h2>
        <Link href="/admin/event-management/add">
          <Button variant="outline">Add</Button>
        </Link>
      </div>

      {/* DataTable */}
      <div className="container mx-auto pt-5 border-black">
        <DataTable columns={columns} data={eventsData} />
      </div>
    </div>
  );
}
