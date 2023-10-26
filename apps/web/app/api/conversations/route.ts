import { fetchOpenConversations } from '../../_core/utils/twillio-utils';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- description
export async function GET(_request: Request) {
  const openConversations = await fetchOpenConversations();
 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call -- description
  return Response.json({ openConversations })
}