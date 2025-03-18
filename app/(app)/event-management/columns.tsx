"use client"

import * as React from "react"
import { ColumnDef} from "@tanstack/react-table"
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

export type eventData = {
    id: number
    name:string
    startDate:Date
    endDate:Date
    dueDate:Date
    location:string
    organisationName:string
    email: string
}


export const columns: ColumnDef<eventData>[] = [

    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => {
            const startDate = row.getValue("startDate") as Date; // Cast to Date
            const formattedDate = startDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }); // Format as MM/DD/YYYY
            return <div>{formattedDate}</div>;
        },
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => {
            const endDate = row.getValue("endDate") as Date; // Cast to Date
            const formattedDate = endDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }); // Format as MM/DD/YYYY
            return <div>{formattedDate}</div>;
        },
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
            const dueDate = row.getValue("dueDate") as Date; // Cast to Date
            const formattedDate = dueDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }); // Format as MM/DD/YYYY
            return <div>{formattedDate}</div>;
        },
    },
    {
        accessorKey: "location",
        header:"Location",
        cell: ({ row }) => <div className="lowercase">{row.getValue("location")}</div>,
    },
    {
        accessorKey: "organisationName",
        header: "Organisation Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("organisationName")}</div>
        ),
    },

    {
        accessorKey: "email",
        header:"Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
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
                            onClick={() => router.push(`/event-management/edit/${userData.id}`) }
                            
                        >
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

