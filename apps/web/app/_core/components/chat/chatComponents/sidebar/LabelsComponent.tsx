'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronUp,
	faChevronDown,
	faTags,
} from '@fortawesome/free-solid-svg-icons';
import { useConversations } from '@/_core/contexts/conversations-context';

export default function LabelsComponent(): JSX.Element {
	const { selectedTags } = useConversations();
	const [expandedPanel, setExpandedPanel] = useState(false);

	const handleTogglePanel = (): void => {
		setExpandedPanel((prevExpandedPanel) => !prevExpandedPanel);
	};

	return (
		<div className="w-full bg-[#555759] rounded-md ">
			<div className="w-full " />

			<button
				className="flex w-full flex-shrink-0 cursor-pointer select-none items-center justify-between gap-3 p-2 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10"
				onClick={handleTogglePanel}
				type="button"
			>
				<div className="flex justify-between">
					<div className="flex flex-col text-left">
						<span>Etiquetas</span>
					</div>
				</div>
				{expandedPanel ? (
					<FontAwesomeIcon icon={faChevronUp} />
				) : (
					<FontAwesomeIcon icon={faChevronDown} />
				)}
			</button>
			{expandedPanel ? (
				<div className="flex gap-6 py-2 px-2 justify-center items-center text-white shadow ">
					<div className="flex flex-col justify-center items-center">
						{selectedTags?.map((tag, index) => {
							return (
								<button
									className="flex max-w-[250px] mb-2 rounded-md px-8 text-left bg-[#F2EC4C] flex-shrink-0 cursor-pointer select-none items-start justify-start p-2 text-[14px] leading-normal text-[#555759] transition-colors duration-200 hover:bg-yellow-300"
									key={index}
									type="button"
								>
									<div className="flex justify-start">
										<div className="flex flex-col text-left">
											<span className="text-left">
												{' '}
												<FontAwesomeIcon icon={faTags} /> {tag?.label}
											</span>
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
}
