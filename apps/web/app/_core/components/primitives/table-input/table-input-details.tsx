import React from 'react';

interface TableInputDetailsProps {
	label: string;
	type?: string;
	value: string;
	className?: string;
	inputClassName?: string;
	disabled?: boolean;
}

function TableInputDetails({
	label,
	value,
	className = '',
	inputClassName = '',
	disabled,
}): React.ReactElement<TableInputDetailsProps> {
	return (
		<div className={className}>
			<label
				className="text-black font-lato text-sm 2xl:text-base font-semibold leading-[normal] "
				htmlFor="details"
			>
				{label}
			</label>
			<input
				autoComplete="current-password"
				className={`text-sm 2xl:text-base w-full px-4 py-2 my-2 focus:outline-none focus:ring-2 focus:ring-[#368d9d] h-[2.5rem] 2xl:h-[2.5rem] rounded-[0.3125rem] border border-[#d9d9d9] bg-white text-black ${inputClassName}`}
				disabled={disabled}
				id="details"
				type="text"
				value={value}
			/>
		</div>
	);
}

export default TableInputDetails;
