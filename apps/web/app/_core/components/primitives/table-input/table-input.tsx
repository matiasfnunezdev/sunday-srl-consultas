import React from 'react';

interface TableInputProps {
	label: string;
	id?: string;
	type?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	className?: string;
	inputClassName?: string;
	disabled?: boolean;
	icon?: JSX.Element;
	error?: string;
}

function TableInput(
	props: TableInputProps
): React.ReactElement<TableInputProps> {
	const {
		label,
		id,
		type,
		value,
		onChange,
		className,
		inputClassName,
		disabled,
		icon,
		error,
	} = props;

	const renderIcon = icon ? <div>{icon}</div> : null;

	return (
		<div className={className}>
			<label
				className="text-black font-lato text-sm 2xl:text-base font-semibold leading-[normal]"
				htmlFor={id}
			>
				{label}
			</label>
			<div className="relative flex flex-col justify-start items-left">
				<input
					autoComplete="current-password"
					className={`text-sm 2xl:text-base w-full px-4 py-2 my-2 focus:outline-none focus:ring-2 focus:ring-[#368d9d] h-[2.5rem] 2xl:h-[2.5rem] rounded-[0.3125rem] border ${
						error ? 'border-red-500' : 'border-[#d9d9d9]'
					} bg-white text-black ${inputClassName}`}
					disabled={disabled}
					id={id}
					onChange={onChange}
					type={type}
					value={value}
				/>
				{renderIcon}

				{error ? (
					<div className="text-red-500 text-sm mt-1">{error}</div>
				) : null}
			</div>
		</div>
	);
}

export default TableInput;
