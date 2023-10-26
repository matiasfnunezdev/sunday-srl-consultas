import type { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type  -- description
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, from, conversationSid } = req.body as { body: string, from: string, conversationSid: string };

  const client = new Twilio(process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);

  try {
    await client.conversations.v1.conversations(conversationSid)
      .messages
      .create({ body, author: from });

    res.status(200).json({ status: 'Message Added' });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- description
    res.status(500).json({ status: 'Error', error: error.message });
  }
}
