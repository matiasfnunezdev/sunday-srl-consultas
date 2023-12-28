import React from 'react';

interface TableCheckboxInputProps {
	label: string;
	id?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	className?: string;
	inputClassName?: string;
	isChecked?: boolean;
	disabled?: boolean;
}

function TableInputCheckbox(
	props: TableCheckboxInputProps
): React.ReactElement<TableCheckboxInputProps> {
	const {
		label,
		id,
		isChecked,
		onChange,
		disabled,
	} = props;

	return (
		<div className="flex items-center pt-6 pl-6">
			<input
				checked={isChecked}
				className="w-4 h-4 text-black accent-[#368D9D] dark:accent-[#368D9D] border-[#368D9D] rounded focus:ring-0 dark:border-[#368D9D]"
				disabled={disabled}
				id={id}
				onChange={onChange}
				type="checkbox"
			/>
			<label
				className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
				htmlFor="default-checkbox"
			>
				{label}
			</label>
		</div>
	);
}

export default TableInputCheckbox;
