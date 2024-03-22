'use client';

import { AuthProvider } from './_core/contexts/auth-context';
import { CasesProvider } from './_core/contexts/cases-context';
import { ClientsProvider } from './_core/contexts/clients-context';
import { ConversationsProvider } from './_core/contexts/conversations-context';
import SnackbarProvider from './_core/contexts/snackbar-context';
import { TagsProvider } from './_core/contexts/tags-context';

export function Providers({ children }): JSX.Element {
	return (
		<AuthProvider>
			<CasesProvider>
				<ConversationsProvider>
					<ClientsProvider>
						<TagsProvider>
							<SnackbarProvider>{children}</SnackbarProvider>
						</TagsProvider>
					</ClientsProvider>
				</ConversationsProvider>
			</CasesProvider>
		</AuthProvider>
	);
}
