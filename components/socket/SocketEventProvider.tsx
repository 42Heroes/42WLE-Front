import { useEffect } from 'react';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';
import CallEventProvider from './CallEventProvider';
import MessageEventProvider from './MessageEventProvider';

interface Props {
  children: React.ReactElement;
}

export default function SocketProvider({ children }: Props) {
  useEffect(() => {
    socket.on(SocketEvents.Error, (err) => {
      console.log(err);
    });
  }, []);

  return (
    <MessageEventProvider>
      <CallEventProvider>
        <>{children}</>
      </CallEventProvider>
    </MessageEventProvider>
  );
}
