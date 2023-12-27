'use client';

import { AuthProvider } from './_core/contexts/auth-context';
import { ConversationsProvider } from './_core/contexts/conversations-context';
import SnackbarProvider from './_core/contexts/snackbar-context';

export function Providers({ children }): JSX.Element {
	return (
		<AuthProvider>
			<ConversationsProvider>
				<SnackbarProvider>{children}</SnackbarProvider>
			</ConversationsProvider>
		</AuthProvider>
	);
}
