'use client';

import { AuthProvider } from './_core/contexts/auth-context';
import { ConversationsProvider } from './_core/contexts/conversations-context';
import SnackbarProvider from './_core/contexts/snackbar-context';
import { TagsProvider } from './_core/contexts/tags-context';

export function Providers({ children }): JSX.Element {
	return (
		<AuthProvider>
			<ConversationsProvider>
				<TagsProvider>
					<SnackbarProvider>{children}</SnackbarProvider>
				</TagsProvider>
			</ConversationsProvider>
		</AuthProvider>
	);
}
