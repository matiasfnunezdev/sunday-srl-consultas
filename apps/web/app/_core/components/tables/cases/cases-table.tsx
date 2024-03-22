import type { ColumnFiltersState, FilterFn } from '@tanstack/react-table';
import {
	createColumnHelper,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GenericTable from '../generic-table';
import { useCases } from '@/_core/contexts/cases-context';
import type { Case } from '@/_domain/interfaces/case';

const fuzzyFilter: FilterFn<Case> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value);

	addMeta({
		itemRank,
	});

	return itemRank.passed;
};

interface CasesTableProps {
	cases: Case[];
	loading: boolean;
	onFiltersChange: (columnFilters: ColumnFiltersState) => void;
}

export default function CasesTable(props: CasesTableProps): JSX.Element {
	const { setSelectedCase } = useCases();
	const router = useRouter();
	const { cases, loading, onFiltersChange } = props;

	const handleClickCaseDetails = (caseItem: Case): void => {
		setSelectedCase(caseItem);
		router.push('cases/detail');
	};

	const handleClickEditCase = (caseItem: Case): void => {
		setSelectedCase(caseItem);
		router.push('cases/edit');
	};

	const handleClickDeleteCase = (caseItem: Case): void => {
		setSelectedCase(caseItem);
		router.push('cases/delete');
	};

	const columnHelper = createColumnHelper<Case>();

	const columns = [
		columnHelper.accessor('author', {
			header: 'Numero de celular',
			cell: (info) => (
				<span className="text-sm text-gray-600">{`${info.getValue()}`}</span>
			),
		}),
		columnHelper.accessor('tags', {
			header: 'Etiquetas',
			cell: (info) =>
				info.getValue()?.map((tag) => {
					return (
						<span
							className="text-sm text-gray-600"
							key={tag.value}
						>{`${tag.label}`}</span>
					);
				}),
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Acciones',
			cell: (info) => (
				<div className="flex justify-end items-center space-x-2">
					<button
						onClick={() => {
							handleClickCaseDetails(info.row.original);
						}}
						type="button"
					>
						<img
							alt="Home"
							className="w-[24px] h-[24px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
							src="/icons/visibility.svg"
						/>
					</button>
					<button
						onClick={() => {
							handleClickEditCase(info.row.original);
						}}
						type="button"
					>
						<img
							alt="Home"
							className="w-[24px] h-[24px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
							src="/icons/edit.svg"
						/>
					</button>
					<button
						onClick={() => {
							handleClickDeleteCase(info.row.original);
						}}
						type="button"
					>
						<img
							alt="Home"
							className="w-[24px] h-[24px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
							src="/icons/delete.svg"
						/>
					</button>
				</div>
			),
		}),
	];

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable({
		data: cases,
		columns,
		getCoreRowModel: getCoreRowModel(),
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			columnFilters,
			globalFilter,
		},
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
	});

	useEffect(() => {
		if (table.getState().columnFilters[0]?.id === 'description') {
			if (table.getState().sorting[0]?.id !== 'description') {
				table.setSorting([{ id: 'description', desc: false }]);
			}
		}
	}, [table.getState().columnFilters[0]?.id]);

	useEffect(() => {
		onFiltersChange(columnFilters);
	}, [columnFilters]);

	return (
		<div className="flex flex-col justify-start items-left px-6">
			<GenericTable<Case>
				columns={columns}
				data={cases}
				loading={loading}
				showFilters={false}
				table={table}
			/>
		</div>
	);
}
