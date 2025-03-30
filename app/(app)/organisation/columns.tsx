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

export type organisationData = {
    id: number
    createdAt: string
    name: string
    email: string
    phone: number 
    city: string
    status: boolean
}
 

export const columns: ColumnDef<organisationData>[] = [

    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => <div>{formatDateFull(row.getValue("createdAt"))}</div>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
    },
    {
        accessorKey: "city",
        header: "City",
        cell: ({ row }) => <div className="lowercase">{row.getValue("city")}</div>,
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                {row.getValue("isActive") ? (
                    <>
                        <span className="h-4 w-4 text-green-500">Active</span>
                    </>
                ) : (
                    <>
                        <span className="h-4 w-4 text-red-500">Inactive</span>
                    </>
                )}
            </div>
        ),
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
                            onClick={() => router.push(`/organisation/edit/${userData.id}`)}

                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem


                        >
                            Login
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

