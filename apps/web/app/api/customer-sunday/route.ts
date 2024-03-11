import { PrismaClient } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
	const customerId = req.nextUrl.searchParams.get('id');
	const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
	const pageSize = parseInt(
		req.nextUrl.searchParams.get('pageSize') || '10',
		10
	);

	try {
		let response: ApiResponse<any>;

		if (customerId) {
			console.log('customerId', customerId);
			const result = await prisma.customers.findUnique({
				where: {
					customer_id: parseInt(customerId),
				},
			});

			if (result) {
				response = {
					success: true,
					message: 'Customer found',
					data: result,
				};
			} else {
				response = {
					success: false,
					message: 'Customer not found',
					data: null,
				};
			}
		} else {
			// Fetch all customers with pagination
			const [results, totalRows] = await prisma.$transaction([
				prisma.customers.findMany({
					skip: (page - 1) * pageSize,
					take: pageSize,
				}),
				prisma.customers.count(),
			]);
			const totalPages = Math.ceil(totalRows / pageSize);

			response = {
				success: true,
				message: 'Customers fetched successfully',
				data: results,
				totalRows,
				totalPages,
			};
		}

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error fetching customer(s)', error);
		return NextResponse.json(
			{
				status: 'Error fetching customer(s)',
				error: JSON.stringify(error),
			},
			{ status: 500 }
		);
	}
}

// Helper type for API response
interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T | null;
	totalRows?: number;
	totalPages?: number;
}
