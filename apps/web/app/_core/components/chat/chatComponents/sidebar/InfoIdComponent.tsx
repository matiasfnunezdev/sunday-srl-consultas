'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useConversations } from '@/_core/contexts/conversations-context';

export default function InfoIdComponent(): JSX.Element {
	const { clientData, setIsEditClientModalOpen } = useConversations();
	const [clientFullName, setClientFullName] = useState('');

	const handleTogglePanel = (): void => {};

	useEffect(() => {
		console.log('clientData1', clientData);
		if (clientData?.fullName) {
			setClientFullName(clientData?.fullName);
		} else {
			setClientFullName(clientData?.author?.split(':')?.[1]);
		}
	}, [clientData]);

	return (
		<div className="w-full bg-[#555759] rounded-md ">
			<div className="w-full " />

			<button
				className="flex w-full flex-shrink-0 cursor-pointer select-none items-center justify-between p-2 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10"
				onClick={handleTogglePanel}
				type="button"
			>
				<div className="flex justify-between">
					<div className="flex flex-col text-left p-2">
						<span>ID - {clientFullName}</span>
					</div>
				</div>
				<button
					className="flex justify-between gap-2"
					onClick={() => {
						setIsEditClientModalOpen(true);
					}}
					type="button"
				>
					<FontAwesomeIcon icon={faPencil} />
				</button>
			</button>

			{/* <div className="flex gap-6 py-4 px-2 justify-start text-white  shadow ">
        <div className="flex flex-col ">
          <span>Servicio: WhatsApp</span>
          <span>Duracion: -</span>
          <span>Respondidos: -</span>
        </div>
        <div className="flex flex-col">
          <span>Inicio: -</span>
          <span>Mensajes: -</span>
          <span>Descartados: -</span>
        </div>
      </div> */}
		</div>
	);
}
