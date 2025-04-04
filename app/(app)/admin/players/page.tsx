import { playersData, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import prisma from "@/lib/prisma"

export default async function Page() {
    let error
    let playersData: any
    try {
        playersData = await prisma.user.findMany({
            where: {
                role: 'player'
            }
        });

    } catch (err) {
        console.error("Error fetching players:", err);
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
                <h2 className="text-lg font-semibold">Players</h2>               
            </div>
            <div className="container mx-auto pt-5 border-black">
                <DataTable columns={columns} data={playersData} />
            </div>
        </div>
    )
}