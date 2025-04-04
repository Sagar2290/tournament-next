"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import { formatDateFull } from "@/utiles/helper";

export type eventData = {
    id: number
    createdAt:string
    name: string
    // startDate:Date
    // endDate:Date
    // dueDate:Date
    //location:string
    organisationName: string
    email: string
    status: 'upcoming' | 'ongoing' | 'completed';
}


export const columns: ColumnDef<eventData>[] = [
{
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => <div>{formatDateFull(row.getValue("createdAt"))}</div>,
    },
    {
        accessorKey: "name",
        header: "Event Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    // {
    //     accessorKey: "startDate",
    //     header: "Start Date",
    //     cell: ({ row }) => <div>{formatDateFull(row.getValue("startDate"))}</div>,
    // },
    // {
    //     accessorKey: "endDate",
    //     header: "End Date",
    //     cell: ({ row }) => <div>{formatDateFull(row.getValue("endDate"))}</div>,
    // },
    // {
    //     accessorKey: "dueDate",
    //     header: "Due Date",
    //     cell: ({ row }) => <div>{formatDateFull(row.getValue("dueDate"))}</div>,
    // },
    // {
    //     accessorKey: "location",
    //     header:"Location",
    //     cell: ({ row }) => <div className="lowercase">{row.getValue("location")}</div>,
    // },

    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as "upcoming" | "ongoing" | "completed";
          return (
            <div className={`capitalize font-medium 
              ${
                status === "upcoming" ? "text-green-600" :
                status === "ongoing" ? "text-yellow-600" :
                "text-red-600"
              }`}
            >
              {status}
            </div>
          );
        },
      },
    {
        id: "actions",
        enableHiding: false,
        header: "Action",
        cell: ({ row }) => {
            const userData = row.original
            const router = useRouter()
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => router.push(`/admin/event-management/edit/${userData.id}`)}

                        >
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

