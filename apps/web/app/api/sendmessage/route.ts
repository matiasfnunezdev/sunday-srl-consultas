/* eslint-disable no-console -- description */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @typescript-eslint/no-unsafe-call -- description */
/* eslint-disable @typescript-eslint/no-unsafe-return -- description */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */
import { sendMessageToConversation } from '../../_core/utils/twillio-utils';

// Use named export for HTTP POST method
export async function POST(req: Request) {
  try {
    const { conversationSid, message } = await req.json()
    await sendMessageToConversation(conversationSid, message);
    return Response.json({ status: 'Success' })
  } catch (error) {
    console.log('error', error)
    return Response.json({ status: 'Unexpected error ocurred' })
  }
}
