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

export type organisationData = {
    id: number
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    firstName:string
    name:string
    city:string
}


export const columns: ColumnDef<organisationData>[] = [

    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header:"Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "city",
        header:"City",
        cell: ({ row }) => <div className="lowercase">{row.getValue("city")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
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
                            onClick={() => router.push(`/organisation/edit/${userData.id}`) }
                            
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

