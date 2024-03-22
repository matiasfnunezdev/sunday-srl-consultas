/* eslint-disable @typescript-eslint/no-unused-vars -- N/A */
/* eslint-disable react/function-component-definition -- N/A */
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';
import type { Case } from '@/_domain/interfaces/case';

interface CasesContextProps {
	cases: Case[];
	selectedCase: Case | null;
	setSelectedCase: (caseItem: Case | null) => void;
}

const CasesContext = createContext<CasesContextProps | undefined>(undefined);

interface CasesProviderProps {
	children: ReactNode;
}

export const CasesProvider: React.FC<CasesProviderProps> = ({ children }) => {
	const [cases, setCases] = useState<Case[]>([]);
	const [selectedCase, setSelectedCase] = useState<Case | null>(null);

	const value = { cases, selectedCase, setSelectedCase };

	return (
		<CasesContext.Provider value={value}>{children}</CasesContext.Provider>
	);
};

export const useCases = (): CasesContextProps => {
	const context = useContext(CasesContext);
	if (context === undefined) {
		throw new Error('useCases must be used within a CasesProvider');
	}
	return context;
};
