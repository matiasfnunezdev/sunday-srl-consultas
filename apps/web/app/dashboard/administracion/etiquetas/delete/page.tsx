'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TableInput from '@/_core/components/primitives/table-input/table-input';
import LoginButton from '@/_core/components/login-button/login-button';
import 'moment/locale/es';
import DeleteButton from '@/_core/components/delete-button/delete-button';
import { useAuth } from '@/_core/contexts/auth-context';
import DeleteModal from '@/_core/components/delete-modal/delete-modal';
import useDeleteTagViewModel from '@/_presentation/tag/delete-tag-view-model';
import { useTags } from '@/_core/contexts/tags-context';

export default function DeleteUser(): JSX.Element {
	const { deleteTag } = useDeleteTagViewModel();
	const { getAccessToken } = useAuth();
	const { selectedTag } = useTags();
	const router = useRouter();

	const [userForm, setUserForm] = useState({
		description: '',
	});

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleDeleteUser = async (): Promise<void> => {
		const accessToken = await getAccessToken();
		if (accessToken && selectedTag?.tagId) {
			await deleteTag(accessToken, selectedTag.tagId);
			setShowDeleteModal(false);
			router.back();
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
	}, [selectedTag, router]);

	const renderDeleteModal = showDeleteModal ? (
		<DeleteModal
			confirmDelete={() => {
				void handleDeleteUser();
			}}
			onClose={() => {
				setShowDeleteModal(false);
			}}
		>
			<div className="text-black font-lato text-base p-2">
				¿Esta seguro que desea eliminar la etiqueta {' '}
				<b>
					{selectedTag?.description}
				</b>
				?
			</div>
		</DeleteModal>
	) : null;

	return selectedTag ? (
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
					Eliminar etiquetas
				</div>
			</div>
			<div className="grid grid-cols-2 2xl:grid-cols-2 gap-4 pr-2 2xl:pr-60 pb-2 2xl:pb-6">
				<TableInput
					disabled
					id="description"
					label="Descripcion"
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
				<DeleteButton
					handleClick={() => {
						setShowDeleteModal(true);
					}}
					label="Eliminar"
					type="button"
				/>
			</div>
			{renderDeleteModal}
		</div>
	) : (
		<div>Cargando datos</div>
	);
}
