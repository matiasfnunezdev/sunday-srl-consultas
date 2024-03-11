/* eslint-disable @typescript-eslint/no-unused-vars -- N/A */
/* eslint-disable react/function-component-definition -- N/A */
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';
import type { Client } from '@/_domain/interfaces/client';

interface ClientsContextProps {
	clients: Client[];
	selectedClient: Client | null;
	setSelectedClient: (user: Client | null) => void;
}

const ClientsContext = createContext<ClientsContextProps | undefined>(
	undefined
);

interface ClientsProviderProps {
	children: ReactNode;
}

export const ClientsProvider: React.FC<ClientsProviderProps> = ({
	children,
}) => {
	const [clients, setClients] = useState<Client[]>([]);
	const [selectedClient, setSelectedClient] = useState<Client | null>(null);

	const value = { clients, selectedClient, setSelectedClient };

	return (
		<ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
	);
};

export const useClients = (): ClientsContextProps => {
	const context = useContext(ClientsContext);
	if (context === undefined) {
		throw new Error('useClients must be used within a ClientsProvider');
	}
	return context;
};
