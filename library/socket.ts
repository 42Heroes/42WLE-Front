import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: '',
      },
    },
  },
  autoConnect: false,
});

export default socket;
