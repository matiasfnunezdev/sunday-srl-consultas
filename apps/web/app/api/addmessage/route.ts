/* eslint-disable @typescript-eslint/no-unsafe-call -- description */
/* eslint-disable @typescript-eslint/no-unsafe-return -- description */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */
import { Twilio } from 'twilio';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- description
export async function POST(req: Request) {
  const { body, from, conversationSid } = await req.json()

  const client = new Twilio(process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);

  try {
    await client.conversations.v1.conversations(conversationSid)
      .messages
      .create({ body, author: from });

      return Response.json({ message: 'Message added'})
  } catch (error) {
    return Response.json({ error: 'Unexpected error ocurred'})
  }
}