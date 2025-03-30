import { organisationData, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import InviteUserButton from "@/components/organisation/inviteModal"

async function getData(): Promise<organisationData[]> {
  try {
    // Fetch data from your API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/organisation`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    debugger
    const data = await response.json();
    console.log("data",data)
    return data;
  } catch (error) {
    console.error("Failed to fetch organisation data:", error);
    return []; // Return empty array as fallback
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="card w-full p-3">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold">Organisation</h2>
        <InviteUserButton />
      </div>
      <div className="container mx-auto pt-5 border-black">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}