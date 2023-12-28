/* eslint-disable @typescript-eslint/no-confusing-void-expression -- N/A */
import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { useConversations } from '@/_core/contexts/conversations-context';
import { useAuth } from '@/_core/contexts/auth-context';
import useGetTagsViewModel from '@/_presentation/tag/get-tags-view-model';

function MyOption(props: any): any {
	const { innerProps, innerRef } = props;
	return (
		<div
			ref={innerRef}
			{...innerProps}
			className={`flex w-full cursor-pointer items-center gap-2 ${
				props.isFocused ? 'bg-[#2b2c34]' : 'bg-[#40414E]'
			} p-4`}
		>
			<div className="relative flex h-8 w-8 cursor-pointer items-center rounded-[100px] bg-[#656672]">
				<i
					className="fa-solid fa-user"
					style={{ fontSize: 12, marginLeft: 10 }}
				/>
			</div>
			<div className="name flex w-full flex-col items-start text-sm font-normal leading-[150%] text-white">
				{props.label}
			</div>
		</div>
	);
}

interface TagsModalProps {
	onClose: () => void;
}
export default function TagsModal(props: TagsModalProps): JSX.Element {
	const { onClose } = props;
	const { getTags, tags: tagsData, loading } = useGetTagsViewModel();
	const { getAccessToken } = useAuth();
	const { selectedTags, setSelectedTags } = useConversations();

	const [options, setOptions] = useState<{ value: string; label: string }[]>(
		[]
	);

	useEffect(() => {
		async function fetchTags(): Promise<void> {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					await getTags(accessToken);
				}
			} catch {
				throw new Error('fetchTags error: Unexpected error getting users');
			}
		}
		void fetchTags();
	}, []);

	useEffect(() => {
		if (tagsData?.length) {
			setOptions(
				tagsData?.map((tag) => {
					return {
						value: tag.tagId,
						label: tag.description,
					};
				})
			);
		}
	}, [tagsData]);

	const modalRef = useRef<HTMLDivElement>(null);

	const customStyles = {
		control: (base: any, { isDisabled }) => ({
			...base,
			minHeight: '49px',
			backgroundColor: isDisabled ? 'transparent' : 'transparent',
			borderRadius: 4,
			borderColor: '#B3B3B3',
			borderWidth: 1,
			boxShadow: 'none',
			'&:hover': {
				borderColor: '#B3B3B3',
			},
		}),
		menuPortal: (base: any) => ({
			...base,
			zIndex: 9999,
		}),
		menu: (provided: any) => ({
			...provided,
			zIndex: 9999,
			width: '100%',
			padding: 1,
			borderRadius: 4,
			boxShadow: 'none',
			backgroundColor: '#454754',
			color: '#F6F6F9',
			fontSize: 14,
			textAlign: 'left',
		}),
		noOptionsMessage: (provided: any) => ({
			...provided,
			color: '#F6F6F9',
			padding: 10,
			fontSize: 14,
		}),
		placeholder: (provided: any) => ({
			...provided,
			marginLeft: 5,
			color: '#F6F6F9',
			fontSize: 13,
		}),
		input: (provided: any) => ({
			perspectiveOrigin: '0 0',
			...provided,
			color: '#F6F6F9',
			fontSize: 14,
		}),
		singleValue: (provided: any) => ({
			...provided,
			color: '#EFEFEF',
			fontWeight: '300',
		}),
		multiValue: (provided: any) => ({
			...provided,
			alignItems: 'center',
			height: 31,
			fontWeight: '300',
			marginTop: 0,
			marginBottom: 0,
		}),
		valueContainer: (provided: any) => ({
			...provided,
			fontWeight: '300',
			padding: 8,
			gap: 8,
		}),
		multiValueGeneric: (provided: any) => ({
			...provided,
			fontWeight: '300',
			padding: 90,
		}),
		multiValueLabel: (provided: any) => ({
			...provided,
			fontSize: '14px',
			fontWeight: '300',
		}),
		multiValueRemove: (base) => ({
			...base,
			color: "#fff",
			backgroundColor: "transparent",
			borderRadius: 0,
			"&:hover": {
				backgroundColor: "transparent",
				color: "#F2EC4C"
			}
		}),
		//Darle un alto al contenedor de las opciones para que no se vean todas las opciones al mismo tiempo
		menuList: (provided: any) => ({
			...provided,
			maxHeight: 200,
			fontWeight: '300',
		}),
	};

	useEffect(() => {
		function onKeyDown(event: { keyCode: number }): void {
			if (event.keyCode === 27) {
				onClose();
			}
		}

		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onClose]);

	const handleClose = (): void => {
		onClose();
	};

	return (
		<div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-linear">
			<div
				className="fixed inset-0 z-50 overflow-hidden 
      transform transition-all duration-300 ease-linear"
			>
				<div
					className="flex min-h-screen items-start justify-center text-center sm:h-screen sm:items-center sm:justify-center sm:p-0"
					style={{ height: '-webkit-fill-available' as 'fill-available' }}
				>
					<div
						className="w-full dark:border-netural-400 z-50 inline-block  transform overflow-hidden bg-white p-6 px-4 text-left align-bottom shadow-xl transition-all dark:bg-[#18191B] dark:border-[#ACAEB9] sm:my-8 sm:w-[640px] sm:max-w-[58rem] sm:gap-6 sm:rounded-lg sm:border-2 sm:border-gray-300 sm:px-6 sm:py-6 sm:align-middle"
						ref={modalRef}
						role="dialog"
						style={{
							height: 'auto',
							maxHeight: 'auto',
							display: 'block',
							flexDirection: '-moz-initial',
						}}
					>
						<div>
							<div className="flex items-center justify-between rounded-t text-[18px]">
								<div>
									<span className="text-white">Etiquetar</span>
								</div>
								<button
									className="text-2 float-right ml-auto border-0 bg-transparent p-1 font-semibold leading-none text-white outline-none focus:outline-none"
									onClick={handleClose}
									type="button"
								>
									<i
										className="fa-sharp fa-regular fa-xmark"
										style={{
											fontSize: 24,
										}}
									/>
								</button>
							</div>
						</div>
						<hr className="my-6 border-gray-300 border-opacity-50" />
						<div className="relative w-full flex-auto">
							<span className="block pb-3 text-sm font-medium text-white">
								Seleccionar las etiquetas
							</span>
							<div className="relative flex-auto">
								<Select
									backspaceRemovesValue={false}
									className="custom-select-container items-center justify-start overflow-auto dark:bg-[#454754]"
									closeMenuOnSelect={false}
									components={{
										DropdownIndicator: () => null,
										IndicatorSeparator: () => null,
										Option: MyOption,
									}}
									isClearable={false}
									isDisabled={loading}
									isMulti
									isSearchable
									menuPortalTarget={document.body}
									menuShouldScrollIntoView
									noOptionsMessage={() =>
										'Todas las etiquetas han sido agregadas'
									}
									onChange={(selectedOptions) => {
										setSelectedTags(Array.from(selectedOptions));
									}}
									options={options}
									placeholder={loading ? 'Cargando...' : 'Agregar etiqueta'}
									styles={customStyles}
									theme={(theme) => ({
										...theme,
										borderRadius: 8,
										colors: {
											...theme.colors,
											primarfy: '#202123', //border color of the input
											primary25: '#2B2B34', //hover color of the input
											primary50: '#40414E', //hover color of the input
											primary75: '#202123', //hover color of the input
											neutral0: '#454754', //background color of the input
											neutral5: '#fff', //hover color of the input
											neutral10: '#18191B', //background color of the items
											neutral20: '#EFEFEF', //border color of the input
											neutral30: '#EFEFEF', //border color of the input
											danger: 'EFEFEF', //text color of the input
											dangerLight: '#2B2B34', //hover color of the input
											neutral40: '#40414E', //border color of the input
											neutral50: '#EFEFEF', //border color of the input
											neutral60: '#202123', //border color of the input
											neutral80: '#EFEFEF', //text color of the input
											neutral90: '#EFEFEF', //text color of the input
										},
									})}
									value={selectedTags}
								/>
							</div>
						</div>
						<div
							className={`mt-6 flex items-center justify-end rounded-b 'flex-row gap-3'
                `}
						>
							<button
								className={`text-[#18191B]  mb-1 rounded-lg px-14 py-3 text-sm font-bold shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none ${
									selectedTags.length === 0 ? 'bg-zinc-400' : 'bg-white'
								}`}
								disabled={selectedTags.length === 0}
								onClick={() => onClose()}
								type="button"
							>
								<span className="text-sm font-medium leading-none text-zinc-700">
									Etiquetar
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
