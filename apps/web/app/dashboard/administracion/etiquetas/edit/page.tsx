'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TableInput from '@/_core/components/primitives/table-input/table-input';
import LoginButton from '@/_core/components/login-button/login-button';
import 'moment/locale/es';
import { useAuth } from '@/_core/contexts/auth-context';
import type { Tag } from '@/_domain/interfaces/tag/tag';
import useUpdateTagViewModel from '@/_presentation/tag/update-tag-view-model';
import { useTags } from '@/_core/contexts/tags-context';
import { useSnackbar } from '@/_core/contexts/snackbar-context';

export default function EditUser(): JSX.Element {
	const addSnackbar = useSnackbar();
	const { updateTag, error } = useUpdateTagViewModel();
	const { selectedTag } = useTags();
	const { getAccessToken } = useAuth();
	const router = useRouter();

	const [errors, setErrors] = useState({
		description: '',
	});

	const [userForm, setUserForm] = useState<Partial<Tag>>({
		description: '',
	});

	const [updatedFields, setUpdatedFields] = useState<Partial<Tag>>({});

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

	type UserFormKeys = keyof typeof selectedTag;

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const id = event.target.id as UserFormKeys;
		const value = event.target.value;

		setUserForm((prev) => ({ ...prev, [id]: value }));

		if (selectedTag && selectedTag[id] !== value) {
			setUpdatedFields((prev) => ({ ...prev, [id]: value }));
		} else {
			setUpdatedFields((prev) => {
				const { [id]: _, ...updated } = prev;
				return updated;
			});
		}
	};

	const handleSubmit = async (): Promise<void> => {
		if (!validateForm()) {
			return;
		}

		const accessToken = await getAccessToken();
		if (
			Object.keys(updatedFields).length > 0 &&
			accessToken &&
			selectedTag?.tagId
		) {
			await updateTag(accessToken, updatedFields, selectedTag.tagId);
			addSnackbar({
				key: "success",
				text: "Tag editado con éxito",
				variant: "success",
			})
			setTimeout(() => {
				router.back();
			}, 1000)
		}
	};

	useEffect(() => {
		if (selectedTag) {
			setUserForm({
				description: selectedTag.description || '',
			});
		} else {
			router.back();
		}
	}, [selectedTag]);

	useEffect(() => {
		if (error) {
			addSnackbar({
				key: 'error',
				text: error,
				variant: 'error',
			});
		}
	}, [error]);

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
						Administración / Etiqueta
					</div>
				</button>
				<div className="text-black font-lato text-2xl font-semibold leading-[normal] py-2 2xl:py-4">
					Editar etiqueta
				</div>
			</div>
			<div className="grid grid-cols-2 2xl:grid-cols-2 gap-4 pr-2 2xl:pr-60 pb-2 2xl:pb-6">
				<TableInput
					error={errors.description}
					id="description"
					label="Descripcion"
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
