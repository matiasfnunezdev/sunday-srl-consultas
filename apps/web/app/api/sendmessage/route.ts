/* eslint-disable no-console -- description */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */
import { NextResponse } from 'next/server';
import { sendMessageToConversation } from '../../_core/utils/twillio-utils';

// Use named export for HTTP POST method
export async function POST(req: Request) {
  try {
    const { conversationSid, message } = await req.json()
    await sendMessageToConversation(conversationSid, message);
    return NextResponse.json({ status: 'Success' })
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ status: 'Unexpected error ocurred' })
  }
}
