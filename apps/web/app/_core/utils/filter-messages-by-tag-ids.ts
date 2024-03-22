export function filterCasesByTagIds(cases: any[], tagIds: string[]): any[] {
	return cases?.filter((singleCase) => {
		return singleCase?.tags?.some((tag: any) => tagIds.includes(tag.value));
	});
}
