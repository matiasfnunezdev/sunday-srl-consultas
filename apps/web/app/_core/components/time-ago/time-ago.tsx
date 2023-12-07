import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function TimeAgo({ utcTimestamp }): JSX.Element {
    const [time, setTime] = useState('');

    useEffect(() => {
        // Function to update the time
        const updateTime = (): void => {
            // Convert UTC timestamp to local time and then format
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, import/no-named-as-default-member -- N/A
            const localTime = moment.utc(utcTimestamp).local().fromNow();
            setTime(localTime);
        };

        // Update time immediately and set an interval for updates
        updateTime();
        const interval = setInterval(updateTime, 60000); // Updates every minute

        // Cleanup on unmount
        return () => { clearInterval(interval); };
    }, [utcTimestamp]);

    return <span className='text-xs text-gray-400'>{time}</span>;
}