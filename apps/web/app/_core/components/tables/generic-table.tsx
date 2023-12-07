import type { ColumnDef } from '@tanstack/react-table';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import React from 'react';

export interface GenericTableProps<T> {
	data: T[];
	columns: ColumnDef<T, any>[];
}

export default function GenericTable<T>(
	props: GenericTableProps<T>
): JSX.Element {
	const { data, columns } = props;

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="p-4 bg-white shadow rounded-lg">
			<table className="min-w-full">
				<thead className="bg-gray-50 px-6 border-b border-[#a6a6a6]">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className="px-4 py-3 text-left tracking-wider text-[#828282] font-lato text-base 2xl:text-base font-semibold leading-[normal]"
									key={header.id}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="bg-white">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									className="px-4 py-4 whitespace-nowrap text-sm text-[#828282] font-lato leading-[normal]"
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
