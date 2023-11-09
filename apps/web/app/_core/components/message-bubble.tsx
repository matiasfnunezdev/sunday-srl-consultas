/* eslint-disable @typescript-eslint/no-unused-vars -- description */
/* eslint-disable react/function-component-definition -- description */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- description */
/* eslint-disable react-hooks/exhaustive-deps -- description */
/* eslint-disable @typescript-eslint/no-explicit-any -- description */
/* eslint-disable @typescript-eslint/no-floating-promises -- description */
/* eslint-disable @typescript-eslint/no-unsafe-call -- description */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- description */
/* eslint-disable @typescript-eslint/explicit-function-return-type -- description */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- description */
import type { FC} from 'react';
import React, { useEffect, useState } from 'react';
// Import your icons and styles here

interface Message {
  type: string;
  sid: string;
  author: string;
  body: string;
  media?: any;
  getParticipant: () => Promise<any>;
  state: { timestamp: Date };
}

interface MediaProps {
  hasFailed: boolean;
  url: string | null;
}

interface MessageBubbleProps {
  direction: 'incoming' | 'outgoing';
  message: Message;
}

const Media: FC<MediaProps> = ({ hasFailed, url }) => {
  // Media component body
  return (
    <div>
      {/* Your code here */}
    </div>
  );
};

const MessageBubble: FC<MessageBubbleProps> = ({ direction, message }) => {
  const [hasMedia, setHasMedia] = useState(false);
  const [mediaDownloadFailed, setMediaDownloadFailed] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setType((await message.getParticipant()).type);
      if (hasMedia) {
        try {
          const url = await message.media.getContentTemporaryUrl();
          setMediaUrl(url);
        } catch (e) {
          setMediaDownloadFailed(true);
        }
      }
      document.getElementById(message.sid)?.scrollIntoView({ behavior: 'smooth' });
    };

    setHasMedia(message.type === 'media');
    fetchData();
  }, [message]);

  useEffect(() => {
    document.getElementById(message.sid)?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  // Your component rendering logic
  return (
    <div>
      {/* Your code here */}
      <Media hasFailed={mediaDownloadFailed} url={mediaUrl} />
    </div>
  );
};

export default MessageBubble;
