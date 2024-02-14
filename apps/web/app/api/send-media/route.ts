import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';
import { twillioConfig } from '@/_core/config/twillio-config';

// Use named export for HTTP POST method
export async function POST(req: Request): Promise<NextResponse> {
	try {
		if (
			!twillioConfig.accountSId ||
			!twillioConfig.apiKey ||
			!twillioConfig.apiSecret ||
			!twillioConfig.chatServiceSId
		) {
			return NextResponse.json({ status: 'Missing twillio configuration' });
		}

		const formData = await req.formData();

		const file = formData.get('file') as File;
		if (!file) {
			return NextResponse.json(
				{ error: 'No files received.' },
				{ status: 400 }
			);
		}
		const buffer = Buffer.from(await file.arrayBuffer());

		const filename = file.name.replaceAll(' ', '_');
		const form = new FormData();
		form.append('file', buffer, filename);

		// const accountSid = twillioConfig.accountSId;
		// const authToken = twillioConfig.authToken;
		const chatServiceSid = twillioConfig.chatServiceSId;

		const url = `https://mcs.us1.twilio.com/v1/Services/${chatServiceSid}/Media`;

		const response = await axios.post(url, form, {
			auth: {
				username: 'ACa5fad8f58f5dc07982665568517e8245',
				password: 'deca3b742e7d951ebe1ae211eaa61d77',
			},
		});

		console.log('response', response);

		if (response.status !== 201) {
			return NextResponse.json({ status: 'Error uploading media' });
		}

		return NextResponse.json({ data: response.data }, { status: 200 });
	} catch (error) {
		console.log('error', error);

		return NextResponse.json(
			{ status: 'Error fetching media' },
			{ status: 500 }
		);
	}
}
