import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import InviteUserButton from "@/components/organisation/inviteModal"
import prisma from "@/lib/prisma"

export default async function Page() {
  let error
  let organisationData:any
  try {
    organisationData = await prisma.user.findMany({
      where: {
        role: 'organizer' 
      }
    });  
    
  } catch (err) { 
    console.error("Error fetching organisation:", err); 
    error = true
    
  } 
  if (error) {
    return <div className="w-full flex justify-between items-center">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
    </div>
  }

  return (
    <div className="card w-full p-3">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold">Organisation</h2>
        <InviteUserButton />
      </div>
      <div className="container mx-auto pt-5 border-black">
        <DataTable columns={columns} data={organisationData} />
      </div>
    </div>
  )
}