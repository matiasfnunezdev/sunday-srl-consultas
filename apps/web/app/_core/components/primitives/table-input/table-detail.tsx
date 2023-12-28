import React from 'react';

interface TableDetailProps {
	label: string;
	type?: string;
	value: string;
	className?: string;
	inputClassName?: string;
	disabled?: boolean;
}

function TableDetail({
	label,
	value,
	className = '',
}): React.ReactElement<TableDetailProps> {
	return (
		<div className={className}>
			<label
				className="text-black font-lato text-sm 2xl:text-base font-semibold leading-[normal] "
				htmlFor="details"
			>
				{label}
			</label>
			<div className="text-black font-lato text-xs 2xl:text-sm leading-[normal] whitespace-pre">{value}</div>
		</div>
	);
}

export default TableDetail;
