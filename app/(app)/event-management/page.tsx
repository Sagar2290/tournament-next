import { eventData, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
//import  RediractButton from "@/components/rediract-button"
import { Label } from "@/components/ui/label"
import Link from "next/link"

async function getData(): Promise<eventData[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "Event 1",
      startDate: new Date("2023-10-01"),
      endDate: new Date("2023-10-02"),
      dueDate: new Date("2023-09-25"),
      location: "New York, USA",
      organisationName: "Org A",
      email: "event1@orga.com"
    },
    {
      id: 2,
      name: "Event 2",
      startDate: new Date("2023-11-15"),
      endDate: new Date("2023-11-17"),
      dueDate: new Date("2023-11-10"),
      location: "London, UK",
      organisationName: "Org B",
      email: "event2@orgb.com"
    },
    {
      id: 3,
      name: "Event 3",
      startDate: new Date("2023-12-05"),
      endDate: new Date("2023-12-07"),
      dueDate: new Date("2023-11-30"),
      location: "Paris, France",
      organisationName: "Org C",
      email: "event3@orgc.com"
    },
    {
      id: 4,
      name: "Event 4",
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-01-12"),
      dueDate: new Date("2024-01-05"),
      location: "Berlin, Germany",
      organisationName: "Org D",
      email: "event4@orgd.com"
    },
    {
      id: 5,
      name: "Event 5",
      startDate: new Date("2024-02-20"),
      endDate: new Date("2024-02-22"),
      dueDate: new Date("2024-02-15"),
      location: "Tokyo, Japan",
      organisationName: "Org E",
      email: "event5@orge.com"
    },
    {
      id: 6,
      name: "Event 6",
      startDate: new Date("2024-03-05"),
      endDate: new Date("2024-03-07"),
      dueDate: new Date("2024-02-28"),
      location: "Sydney, Australia",
      organisationName: "Org F",
      email: "event6@orgf.com"
    },
    {
      id: 7,
      name: "Event 7",
      startDate: new Date("2024-04-15"),
      endDate: new Date("2024-04-17"),
      dueDate: new Date("2024-04-10"),
      location: "Toronto, Canada",
      organisationName: "Org G",
      email: "event7@orgg.com"
    },
    {
      id: 8,
      name: "Event 8",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-05-03"),
      dueDate: new Date("2024-04-25"),
      location: "Dubai, UAE",
      organisationName: "Org H",
      email: "event8@orgh.com"
    },
    {
      id: 9,
      name: "Event 9",
      startDate: new Date("2024-06-10"),
      endDate: new Date("2024-06-12"),
      dueDate: new Date("2024-06-05"),
      location: "Mumbai, India",
      organisationName: "Org I",
      email: "event9@orgi.com"
    },
    {
      id: 10,
      name: "Event 10",
      startDate: new Date("2024-07-20"),
      endDate: new Date("2024-07-22"),
      dueDate: new Date("2024-07-15"),
      location: "São Paulo, Brazil",
      organisationName: "Org J",
      email: "event10@orgj.com"
    }
  ]
}

export default async function Page() {
  const eventData = await getData()

  return (
    <div className="card w-full p-3">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold">Event Management</h2>
        <Link href="/event-management/add">
          <Button variant="outline">Add</Button>
        </Link>
      </div>

      {/* DataTable */}
      <div className="container mx-auto pt-5 border-black">
        <DataTable columns={columns} data={eventData} />
      </div>
    </div>
  )
}
