 
 
/* eslint-disable @typescript-eslint/no-unsafe-argument -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */
import { Twilio } from 'twilio';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- description
export async function POST(req: Request) {
  const { body, from, conversationSid } = await req.json()

  const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    await client.conversations.v1.conversations(conversationSid)
      .messages
      .create({ body, author: from });

      return new Response('Message added', {
        status: 200
      })
  } catch (error) {
    return new Response('Unexpected error ocurred', {
      status: 200
    })
  }
}