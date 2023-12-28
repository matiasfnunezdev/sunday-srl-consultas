import React, { useEffect, useState } from 'react';
import type { PagesData } from '@/_domain/interfaces/pagination/pagination';

interface PaginationProps {
	pagesData: PagesData;
	rowsPerPage: number;
	setRowsPerPage: (rowsPerPage: number) => void;
	setPage: (page: number) => void;
}

export default function Pagination(props: PaginationProps): JSX.Element {
	const { pagesData, rowsPerPage, setRowsPerPage, setPage } = props;
	const { currentPage, hasMorePages, totalRecords } = pagesData;
  const [startRecord, setStartRecord] = useState(0)
  const [endRecord, setEndRecord] = useState(0)

	const handleRowsPerPageChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		const newRowsPerPage = parseInt(e.target.value, 10);
		setRowsPerPage(newRowsPerPage);
	};

  useEffect(() => {
    setStartRecord((currentPage - 1) * rowsPerPage + 1)
    setEndRecord(Math.min(currentPage * rowsPerPage, totalRecords))
  }, [pagesData])

	return (
		<div className="flex items-center justify-between">
			<div className="flex gap-2 items-center">
				<span className="text-sm text-gray-700">Filas por página</span>
				<select
					className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md text-sm text-black"
					onChange={handleRowsPerPageChange}
					value={rowsPerPage}
				>
					{[5, 10, 20, 30, 50].map((size) => (
						<option className="text-black" key={size} value={size}>
							{size}
						</option>
					))}
				</select>
			</div>
			<span className="text-sm text-gray-700 px-6">
				{isNaN(startRecord) || isNaN(endRecord)
					? 'Loading...'
					: `${startRecord}-${endRecord}`}{' '}
				de {totalRecords}
			</span>
			<div>
				<button
					className={`mx-1 px-2 py-1 rounded-md ${
						currentPage === 1
							? 'text-gray-400 cursor-not-allowed'
							: 'text-gray-700 hover:bg-gray-200'
					}`}
					disabled={currentPage === 1}
					onClick={() => {
						setPage(currentPage - 1);
					}}
					type="button"
				>
					{'<'}
				</button>
				<button
					className={`mx-1 px-2 py-1 rounded-md ${
						!hasMorePages
							? 'text-gray-400 cursor-not-allowed'
							: 'text-gray-700 hover:bg-gray-200'
					}`}
					disabled={!hasMorePages}
					onClick={() => {
						setPage(currentPage + 1);
					}}
					type="button"
				>
					{'>'}
				</button>
			</div>
		</div>
	);
}
