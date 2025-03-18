import { organisationData, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


async function getData(): Promise<organisationData[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      amount: 100,
      status: "pending",
      name: "pending",
      email: "m@example.com",
      firstName: "gyamkhana",
      city:"surat"
    },
    {
      id: 2,
      amount: 100,
      status: "pending",
      email: "m@example.com",
      firstName: "new",
      name: "akshar",
      city:"surat"
    },
    {
      id: 3,
      amount: 100,
      status: "pending",
      email: "m@example.com",
      firstName: "new",
      name: "akshar",
      city:"surat"
    },

    {
      id: 4,
      amount: 100,
      status: "pending",
      email: "m@example.com",
      firstName: "new",
      name: "akshar",
      city:"surat"
    },
    {
      id: 5,
      amount: 100,
      status: "pending",
      email: "m@example.com",
      firstName: "new",
      name: "akshar",
      city:"surat"
    },
    {
      id: 6,
      amount: 100,
      status: "pending",
      email: "m@example.com",
      firstName: "new",
      name: "aloka",
      city:"surat"
    },
    // ...
  ]
}

export default async function Page() {
  const data = await getData()
  return (
    <div className="card w-full p-3">
    <div className="w-full flex justify-between items-center">
      <h2 className="text-lg font-semibold">Organisation</h2>
  
      {/* Invite button aligned to the end */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Invite</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite user</DialogTitle>
          </DialogHeader>
  
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input
                id="name"
                placeholder="Email"
                className="col-span-3"
                value="sasa"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  
    {/* DataTable */}
    <div className="container mx-auto pt-5 border-black">
      <DataTable columns={columns} data={data} />
    </div>
  </div>
  )
}
