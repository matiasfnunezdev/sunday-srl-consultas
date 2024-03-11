/* eslint-disable import/order -- N/A */
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import './generic-table-filter.css';

import type { Column, Table } from '@tanstack/react-table';

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
		<div className="generic-table-filter">
			{value ? (
				/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- No keyboard events*/
				<img
					alt="Home"
					className="generic-filter-close w-[20px] h-[20px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
					onClick={() => {
						setValue('');
					}}
					src="/icons/close.svg"
				/>
			) : (
				<img
					alt="Home"
					className="w-[20px] h-[20px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
					src="/icons/search.svg"
				/>
			)}

			<input
				{...props}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				value={value}
			/>
		</div>
	);
}

function Filter({
	column,
	table,
}: {
	column: Column<any>;
	table: Table<any>;
}): JSX.Element {
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

	const inputClass =
		'w-[100%] text-lg 2xl:text-xl px-2 focus:outline-none h-[2.75rem] 2xl:h-[3.75rem] bg-[#F2F2F2]';

	return typeof firstValue === 'number' ? (
		<div>
			<div className="relative flex">
				<button type="button">
					<img
						alt="Home"
						className="w-[20px] h-[20px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
						src="/icons/search.svg"
					/>
				</button>

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
			</div>
		</div>
	) : (
		<div className="relative flex">
			<div className="border-b-gray-500" ref={menuRef}>
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
					//placeholder={`Buscar... (${column.getFacetedUniqueValues().size})`}
					type="text"
					value={(columnFilterValue ?? '') as string}
				/>
				<div className="h-1 w-[40px]" />
			</div>
		</div>
	);
}

export default memo(Filter);
