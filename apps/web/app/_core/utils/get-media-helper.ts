export async function fetchMedia(mediaSid: string): Promise<any> {
	const res = await fetch(`/api/get-media?mediaSid=${mediaSid}`, {
		cache: 'no-store',
	});

	// You might want to check if the response is ok before proceeding
	if (!res.ok) {
		throw new Error(`Error: ${res.status}`);
	}

	const data: any = await res.json();

	return data;
}
