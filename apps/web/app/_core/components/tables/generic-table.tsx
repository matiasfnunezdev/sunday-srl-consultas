/* eslint-disable @typescript-eslint/no-unused-vars -- N/A */
/* eslint-disable jsx-a11y/click-events-have-key-events -- N/A */
import type { ColumnDef, FilterFn, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { RankingInfo } from '@tanstack/match-sorter-utils';
import React, { useReducer } from 'react';
import Spinner from '../primitives/spinner/spinner';
import GenericTableFilter from './generic-table-filter';

export interface GenericTableProps<T> {
	data: T[];
	columns: ColumnDef<T, any>[];
	table: Table<T>;
	showFilters?: boolean;
	loading?: boolean;
}

declare module '@tanstack/table-core' {
	interface FilterFns {
		fuzzy?: FilterFn<unknown>;
	}
	interface FilterMeta {
		itemRank: RankingInfo;
	}
}

export default function GenericTable<T>(
	props: GenericTableProps<T>
): JSX.Element {
	const rerender = useReducer(() => ({}), {})[1];
	const { table, showFilters, loading } = props;

	return (
		<div className="bg-white rounded-lg table-wrp block max-h-2/12">
			<table className="min-w-full w-full">
				<thead className=" bg-white sticky top-0">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr className="border-[#a6a6a6e3] border-b" key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className="px-6 2xl:px-6 py-2 text-left tracking-wider text-theader font-lato text-lg 2xl:text-lg font-semibold leading-[normal]"
									key={header.id}
								>
									{header.isPlaceholder ? null : (
										<div
											{...{
												className: `flex flex-row items-center ${
													header.column.id === 'actions'
														? 'justify-center'
														: 'justify-start'
												} gap-2 ${
													header.column.getCanSort()
														? 'cursor-pointer select-none'
														: ''
												}`,
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: (
													<img
														alt="Home"
														className="w-[14px] h-[14px] 2xl:w-[24px] 2xl:h-[24px] text-[#d9d9d9]"
														src="/icons/arrow-up-black.svg"
													/>
												),
												desc: (
													<img
														alt="Home"
														className="w-[14px] h-[14px] 2xl:w-[24px] 2xl:h-[24px] text-[#d9d9d9]"
														src="/icons/arrow-down-black.svg"
													/>
												),
											}[header.column.getIsSorted() as string] ?? null}
										</div>
									)}
								</th>
							))}
						</tr>
					))}

					{table.getHeaderGroups().map((headerGroup) => (
						<tr className="bg-[#F2F2F2]" key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className="px-2 2xl:px-6 text-left tracking-wider text-theader font-lato text-lg 2xl:text-lg font-semibold leading-[normal]"
									key={header.id}
								>
									{header.isPlaceholder ? null : (
										<>
											{header.column.getCanFilter() && showFilters ? (
												<div className="flex justify-start items-center">
													<GenericTableFilter
														column={header.column}
														table={table}
													/>
												</div>
											) : (
												showFilters && (
													<div className="pt-4">
														<img
															alt="Home"
															className="generic-filter-icon w-[20px] h-[20px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
															src="/icons/search.svg"
														/>
													</div>
												)
											)}
										</>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="bg-white w-2/12 overflow-y-auto font-lato font-regular px-6 ">
					{loading ? (
						<tr className="p-[10px] h-[100px]">
							<td colSpan={table.getHeaderGroups()[0].headers.length}>
								<Spinner />
							</td>
						</tr>
					) : (
						table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										className="px-6 2xl:px-6 py-3 truncate text-lg 2xl:text-xl text-[#828282] leading-[normal]"
										key={cell.id}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
