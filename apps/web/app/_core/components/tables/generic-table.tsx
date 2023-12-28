/* eslint-disable jsx-a11y/click-events-have-key-events -- N/A */
import type { Column, ColumnDef, FilterFn, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { RankingInfo } from '@tanstack/match-sorter-utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export interface GenericTableProps<T> {
	data: T[];
	columns: ColumnDef<T, any>[];
	table: Table<T>;
	showFilters?: boolean;
}

declare module '@tanstack/table-core' {
	interface FilterFns {
		fuzzy?: FilterFn<unknown>;
	}
	interface FilterMeta {
		itemRank: RankingInfo;
	}
}

function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'onChange'
>): JSX.Element {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => {
			clearTimeout(timeout);
		};
	}, [value]);

	return (
		<input
			{...props}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			value={value}
		/>
	);
}

function Filter({
	column,
	table,
}: {
	column: Column<any>;
	table: Table<any>;
}): JSX.Element {
	const [showSearchModal, setShowSearchModal] = useState(false);
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = useMemo(
		() =>
			typeof firstValue === 'number'
				? []
				: // eslint-disable-next-line @typescript-eslint/require-array-sort-compare -- N/A
				  Array.from(column.getFacetedUniqueValues().keys()).sort(),
		[column.getFacetedUniqueValues()]
	);

	const menuRef = useRef<any>(null);

	const closeMenu = (): void => {
		setShowSearchModal(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			event.stopPropagation();
			if (
				showSearchModal &&
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				closeMenu();
			}
		};

		if (showSearchModal) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showSearchModal]);

	const inputClass =
		'w-[200px] text-sm 2xl:text-base px-4 py-2 my-2 focus:outline-none focus:ring-2 focus:ring-[#368d9d] h-[2.75rem] 2xl:h-[3.75rem] rounded-[0.3125rem] border-2 border-[#d9d9d9]';

	return typeof firstValue === 'number' ? (
		<div>
			<div className="relative flex">
				<button
					onClick={() => {
						setShowSearchModal((prev) => !prev);
					}}
					type="button"
				>
					<img
						alt="Home"
						className="w-[20px] h-[20px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
						src="/icons/search.svg"
					/>
				</button>

				{showSearchModal ? (
					<div className="absolute" ref={menuRef}>
						<DebouncedInput
							className={inputClass}
							max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
							min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
							onChange={(value) => {
								column.setFilterValue((old: [number, number]) => [
									value,
									old?.[1],
								]);
							}}
							placeholder={`Min ${
								column.getFacetedMinMaxValues()?.[0]
									? `(${column.getFacetedMinMaxValues()?.[0]})`
									: ''
							}`}
							type="number"
							value={(columnFilterValue as [number, number])?.[0] ?? ''}
						/>
						<DebouncedInput
							className={inputClass}
							max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
							min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
							onChange={(value) => {
								column.setFilterValue((old: [number, number]) => [
									old?.[0],
									value,
								]);
							}}
							placeholder={`Max ${
								column.getFacetedMinMaxValues()?.[1]
									? `(${column.getFacetedMinMaxValues()?.[1]})`
									: ''
							}`}
							type="number"
							value={(columnFilterValue as [number, number])?.[1] ?? ''}
						/>
					</div>
				) : null}
			</div>
		</div>
	) : (
		<div className="relative flex">
			<button
				onClick={() => {
					setShowSearchModal((prev) => !prev);
				}}
				type="button"
			>
				<img
					alt="Home"
					className="w-[20px] h-[20px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
					src="/icons/search.svg"
				/>
			</button>
			{showSearchModal ? (
				<div className="absolute mt-4 border border-b-gray-500" ref={menuRef}>
					<datalist id={`${column.id}list`}>
						{sortedUniqueValues.slice(0, 5000).map((value: any) => (
							<option key={value} value={value} />
						))}
					</datalist>
					<DebouncedInput
						className={inputClass}
						list={`${column.id}list`}
						onChange={(value) => {
							column.setFilterValue(value);
						}}
						placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
						type="text"
						value={(columnFilterValue ?? '') as string}
					/>
					<div className="h-1 w-[40px]" />
				</div>
			) : null}
		</div>
	);
}

export default function GenericTable<T>(
	props: GenericTableProps<T>
): JSX.Element {
	const { table, showFilters } = props;

	return (
		<div className="px-4 bg-white shadow rounded-lg table-wrp block max-h-2/12">
			<table className="min-w-full w-full">
				<thead className="bg-gray-50 px-6 border-b border-[#a6a6a6] sticky top-0">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const actionsClass = header.column.columnDef.header === 'Acciones' ? 'justify-end pr-6' : 'justify-start';
								
								return (
									<th
										className="px-2 2xl:px-4 py-3 text-left tracking-wider text-[#828282] font-lato text-xs 2xl:text-base font-semibold leading-[normal]"
										key={header.id}
									>
										{header.isPlaceholder ? null : (
											<>
												<div
													{...{
														className: `flex flex-row ${actionsClass} items-center gap-2 ${
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
												{header.column.getCanFilter() && showFilters ? (
													<div className="flex justify-start items-center pt-4">
														<Filter column={header.column} table={table} />
													</div>
												) : (
													showFilters && (
														<div className="pt-4">
															<img
																alt="Home"
																className="w-[20px] h-[20px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
																src="/icons/search.svg"
															/>
														</div>
													)
												)}
											</>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody className="bg-white w-2/12 overflow-y-auto">
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									className="px-2 2xl:px-4 py-4 truncate text-xs text-[#828282] font-lato leading-[normal]"
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
