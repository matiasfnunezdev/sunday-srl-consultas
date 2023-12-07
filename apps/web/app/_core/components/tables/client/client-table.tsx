import { createColumnHelper } from '@tanstack/react-table';
import GenericTable from '../generic-table';

export default function ClientTable(): JSX.Element {
	interface Client {
		id: string;
		firstName: string;
		lastName: string;
		documentType: string;
		documentNumber: string;
		email: string;
		status: 'Habilitado' | 'Inhabilitado';
	}

	const defaultData: Client[] = [
		{
			id: '#123',
			firstName: 'Luisana',
			lastName: 'Gómez',
			documentType: 'DNI',
			documentNumber: '12345678',
			email: 'luisanagomez@gmail.com',
			status: 'Habilitado',
		},
		{
			id: '#124',
			firstName: 'José Luis',
			lastName: 'Reinaldi',
			documentType: 'DNI',
			documentNumber: '98765432',
			email: 'joseluisreinaldi@gmail.com',
			status: 'Inhabilitado',
		},
		{
			id: '#125',
			firstName: 'Micaela',
			lastName: 'López',
			documentType: 'Pasaporte',
			documentNumber: 'A8123456',
			email: 'micaelalopez@gmail.com',
			status: 'Habilitado',
		},
		{
			id: '#126',
			firstName: 'Miriam',
			lastName: 'González',
			documentType: 'Cédula',
			documentNumber: '32165489',
			email: 'miriamgonzalez@gmail.com',
			status: 'Habilitado',
		},
	];

	const columnHelper = createColumnHelper<Client>();

	const columns = [
		columnHelper.accessor('id', {
			header: () => <span>ID</span>,
			cell: (info) => (
				<span className="text-sm text-[#828282] font-lato leading-[normal]">
					{info.getValue()}
				</span>
			),
		}),
		columnHelper.accessor('firstName', {
			header: 'Nombre',
		}),
		columnHelper.accessor('lastName', {
			header: 'Apellido',
		}),
		columnHelper.accessor('documentType', {
			header: 'Documento',
		}),
		columnHelper.accessor('documentNumber', {
			header: 'Nro documento',
		}),
		columnHelper.accessor('email', {
			header: 'Email',
		}),
		columnHelper.accessor('status', {
			header: 'Estado',
			cell: (info) => (
				<span
					className={`px-2 inline-flex leading-5 rounded-full text-sm font-lato leading-[normal] ${
						info.getValue() === 'Habilitado'
							? 'text-[#1b9352]'
							: 'text-[#c24040]'
					}`}
				>
					{info.getValue()}
				</span>
			),
		}),
		columnHelper.display({
			id: 'actions',
			header: 'Acciones',
			cell: () => (
				<div className="flex justify-center items-center space-x-2">
					<button type="button">
						<img
							alt="Home"
							className="w-[24px] h-[24px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
							src="/icons/visibility.svg"
						/>
					</button>
					<button type="button">
						<img
							alt="Home"
							className="w-[24px] h-[24px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
							src="/icons/edit.svg"
						/>
					</button>
					<button type="button">
						<img
							alt="Home"
							className="w-[24px] h-[24px] mr-1 2xl:w-[24px] 2xl:h-[24px] 2xl:mr-2 text-[#d9d9d9]"
							src="/icons/delete.svg"
						/>
					</button>
				</div>
			),
		}),
	];

	return <GenericTable<Client> columns={columns} data={defaultData} />;
}
