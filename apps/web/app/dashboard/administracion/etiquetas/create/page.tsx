'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginButton from '@/_core/components/login-button/login-button';
import 'moment/locale/es';
import { useAuth } from '@/_core/contexts/auth-context';
import { useSnackbar } from '@/_core/contexts/snackbar-context';
import type { Tag } from '@/_domain/interfaces/tag/tag';
import TableInput from '@/_core/components/primitives/table-input/table-input';
import useCreateTagViewModel from '@/_presentation/tag/create-tag-view-model';

export default function CreateUser(): JSX.Element {
	const { createTag, error } = useCreateTagViewModel();
	const addSnackbar = useSnackbar();
	const { getAccessToken } = useAuth();
	const router = useRouter();

	const [errors, setErrors] = useState({
		description: '',
	});

	const [userForm, setUserForm] = useState<Partial<Tag>>({
		description: '',
	});

	const validateForm = (): boolean => {
		let isValid = true;
		const newErrors = {
			description: '',
		};

		if (!userForm.description) {
			newErrors.description = 'Description is required';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const id = event.target.id;
		const value: string = event.target.value;

		setUserForm((prev) => ({ ...prev, [id]: value }));
		setErrors((prev) => ({ ...prev, [id]: '' }));
	};

	const handleSubmit = async (): Promise<void> => {
		if (!validateForm()) {
			return;
		}
		const accessToken = await getAccessToken();
		if (Object.keys(userForm).length > 0 && accessToken) {
			await createTag(accessToken, userForm);
			addSnackbar({
				key: "success",
				text: "Tag creado con éxito",
				variant: "success",
			})
			router.back();
		}
	};

	useEffect(() => {
		if (error) {
			addSnackbar({
				key: "error",
				text: error,
				variant: "error",
			})
		}
	}, [error])

	return (
		<div className="bg-white h-content w-full pl-6">
			<div className="flex flex-col">
				<button
					className="flex flex-row justify-start items-center"
					onClick={() => {
						router.back();
					}}
					type="button"
				>
					<img
						alt="Home"
						className="w-[20px] h-[20px] mr-1 2xl:w-[30px] 2xl:h-[30px] 2xl:mr-2 text-[#d9d9d9]"
						src="/icons/arrow_back.svg"
					/>
					<div className="text-black text-sm 2xl:text-base font-lato leading-[normal]">
						Administración / Etiquetas
					</div>
				</button>
				<div className="text-black font-lato text-2xl font-semibold leading-[normal] py-2 2xl:py-4">
					Alta etiqueta
				</div>
			</div>
			<div className="grid grid-cols-2 2xl:grid-cols-2 gap-4 pr-2 2xl:pr-60 pb-2 2xl:pb-6">
				<TableInput
					error={errors.description}
					id="description"
					label="Description"
					onChange={handleInputChange}
					type="text"
					value={userForm?.description}
				/>
			</div>
			<div className="flex flex-row py-2 2xl:py-6 justify-center gap-4">
				<LoginButton
					handleClick={() => {
						router.back();
					}}
					label="Cancelar"
					outlined
					type="button"
				/>
				<LoginButton
					handleClick={() => {
						void handleSubmit();
					}}
					label="Guardar"
					type="button"
				/>
			</div>
		</div>
	);
}
