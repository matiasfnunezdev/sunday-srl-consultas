'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/_core/contexts/auth-context';
import LoginButton from '@/_core/components/login-button/login-button';
import useGetTagsViewModel from '@/_presentation/tag/get-tags-view-model';
import type { Tag } from '@/_domain/interfaces/tag/tag';
import TagsTable from '@/_core/components/tables/tag/tag-table';

export default function Tags(): JSX.Element {
  const { getTags, tags: tagsData } = useGetTagsViewModel();
	const { getAccessToken } = useAuth();
	const router = useRouter();

	const [tags, setTags] = useState<Tag[]>([]);

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
			setTags(tagsData);
		}
	}, [tagsData]);

	const newLocal = 'bg-white h-content w-full';
	return (
		<div className={newLocal}>
			<div className="flex flex-row py-2 px-2 2xl:py-6 justify-end">
				<LoginButton
					handleClick={() => {
						router.push('etiquetas/create');
					}}
					label="Alta Etiqueta"
					type="button"
				/>
			</div>
			<TagsTable tags={tags} />
			<div className="flex justify-end items-center px-6 pb-2" />
		</div>
	);
}
