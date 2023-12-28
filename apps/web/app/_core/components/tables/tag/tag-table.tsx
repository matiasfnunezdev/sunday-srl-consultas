import type {
	ColumnFiltersState,
	FilterFn,
	SortingFn,
} from '@tanstack/react-table';
import {
	createColumnHelper,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	sortingFns,
	useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { compareItems, rankItem } from '@tanstack/match-sorter-utils';
import { useEffect, useState } from 'react';
import GenericTable from '../generic-table';
import type { Tag } from '@/_domain/interfaces/tag/tag';
import { useTags } from '@/_core/contexts/tags-context';

const fuzzyFilter: FilterFn<Tag> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value);

	addMeta({
		itemRank,
	});

	return itemRank.passed;
};

const fuzzySort: SortingFn<Tag> = (rowA, rowB, columnId) => {
	let dir = 0;

	if (rowA.columnFiltersMeta[columnId]) {
		dir = compareItems(
			rowA.columnFiltersMeta[columnId]?.itemRank,
			rowB.columnFiltersMeta[columnId]?.itemRank
		);
	}

	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

interface UsersTableProps {
	tags: Tag[];
}

export default function TagsTable(props: UsersTableProps): JSX.Element {
	const { setSelectedTag } = useTags();
	const router = useRouter();
	const { tags } = props;

	const [showFilters, setShowFilters] = useState(false);

	const handlerClickUserDetails = (tag: Tag): void => {
		setSelectedTag(tag);
		router.push('etiquetas/detail');
	};

	const handlerClickEditUser = (tag: Tag): void => {
		setSelectedTag(tag);
		router.push('etiquetas/edit');
	};

	const handlerClickDeleteUser = (tag: Tag): void => {
		setSelectedTag(tag);
		router.push('etiquetas/delete');
	};

	const columnHelper = createColumnHelper<Tag>();

	const columns = [
		columnHelper.accessor('tagId', {
			header: 'ID',
			cell: (info) => (
				<span className="text-sm text-gray-600">{`${info
					.getValue()
					.slice(0, 6)}...`}</span>
			),
		}),
		columnHelper.accessor('description', {
			header: 'Descripcion',
			cell: (info) => (
				<span className="text-sm text-gray-600">{`${
					info.getValue().length > 20
						? `${info.getValue().slice(0, 10)}...`
						: info.getValue()
				}`}</span>
			),
			footer: (info) => info.column.id,
			filterFn: 'fuzzy',
			sortingFn: fuzzySort,
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Acciones',
			cell: (info) => (
				<div className="flex justify-end items-center space-x-2">
					<button
						onClick={() => {
							handlerClickUserDetails(info.row.original);
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
							handlerClickEditUser(info.row.original);
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
							handlerClickDeleteUser(info.row.original);
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
		data: tags,
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

	return (
		<div className="flex flex-col justify-start items-left px-6">
			<div className="flex justify-start items-left pl-4">
				<button
				className={`flex justify-center items-center w-[44px] h-[30px] 2xl:w-[64px] 2xl:h-[50px] ${showFilters ? 'bg-[#CDDEE1] rounded-[0.3125rem] border border-[#d9d9d9]' : ''}`}
					onClick={() => {
						setShowFilters((prev) => !prev);
					}}
					type="button"
				>
					<img
						alt="Home"
						className="w-[34px] h-[20px] 2xl:w-[44px] 2xl:h-[30px] text-[#d9d9d9]"
						src="/icons/filter.svg"
					/>
				</button>
			</div>
			<GenericTable<Tag>
				columns={columns}
				data={tags}
				showFilters={showFilters}
				table={table}
			/>
		</div>
	);
}
