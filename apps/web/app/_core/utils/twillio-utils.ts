import { Twilio } from 'twilio';
 
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- description
export const fetchOpenConversations = async () => {
  const client = new Twilio(process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);
  const conversations = await client.conversations.v1.conversations.list({ limit: 20 });
  return conversations;
};
