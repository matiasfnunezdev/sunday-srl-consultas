import React, { useEffect, useRef } from 'react';
import type { TSnackbarProps } from '@/_domain/interfaces/snackbar';

export default function Snackbar({
	text,
	icon: Icon,
	handleClose,
	variant,
}: TSnackbarProps): React.ReactElement {
	const variants = {
		success: 'bg-[#48ac76]',
		error: 'bg-[#DF4848]',
		warning: 'bg-yellow-500',
		info: 'bg-blue-500',
	};

	const menuRef = useRef<any>(null);
  
  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 5000)
  }, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			event.stopPropagation();
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				handleClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="absolute right-4 top-4 z-50" ref={menuRef}>
			<div
				className={`${variants[variant]} flex min-w-[300px] items-center truncate whitespace-nowrap py-3 px-3.5 text-xs text-white shadow-md w-[511px] h-[4.25rem] rounded-[0.3125rem]`}
			>
				{Icon ? (
					<span aria-hidden="true" className="mr-4 text-base">
						<Icon className="h-5 w-5" />
					</span>
				) : null}
				<span className="text-white font-lato text-base font-bold leading-[normal]">
					{text}
				</span>
				<button
					className="w-full flex justify-end items-right"
					onClick={handleClose}
					type="button"
				>
					<img
						alt="Home"
						className="w-[24px] h-[24px] mr-1 2xl:w-[24px] 2xl:h-[24px] text-[#d9d9d9]"
						src="/icons/close-white.svg"
					/>
				</button>
			</div>
		</div>
	);
}
