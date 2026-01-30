"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    getRowHref?: (row: TData) => string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    getRowHref,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    const router = useRouter()
    const pageCount = Array.from(
        { length: table.getPageCount() },
        (_, index) => index + 1
    )


    return (
        <div className="flex flex-col justify-between grow">
            <div className="overflow-hidden rounded-md border border-gray-700">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-center border-r last:border-r-0 border-gray-700 bg-accent/50">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                const clickable = Boolean(getRowHref)
                                return (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={(clickable ? "cursor-pointer transition hover:bg-accent/20" : undefined)}
                                        onClick={() => {
                                            if (!getRowHref) {
                                                return
                                            }
                                            const href = getRowHref(row.original)
                                            if (href) {
                                                router.push(href)
                                            }
                                        }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="text-center first:text-left first:text-pretty border-r last:border-r-0 border-gray-700">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
            <div className="flex gap-2">
                {pageCount.map((page) => (
                    <Button
                        key={page}
                        variant={table.getState().pagination.pageIndex + 1 === page ? "default" : "outline"}
                        onClick={() => table.setPageIndex(page - 1)}
                        className="cursor-pointer"
                        disabled={table.getState().pagination.pageIndex + 1 === page}
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    )
}