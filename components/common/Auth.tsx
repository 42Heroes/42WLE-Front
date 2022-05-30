import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { User } from '../../interfaces/user.interface';
import { Chat, Message } from '../../interfaces/chat.interface';
import { loginState, userState, chatState } from '../../recoil/atoms';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  const setUserData = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setChatData = useSetRecoilState(chatState);

  useEffect(() => {
    const userData: User = {
      _id: 124352,
      nickname: 'junseo',
      intra_id: 'junseo',
      image_url: '/languages/korean.svg',
      campus: '42seoul',
      createdAt: new Date('2015-04-20T15:37:23'),
      hashtags: ['react', 'food'],
      country: 'korea',
      github_id: 'Seojunhwan',
      introduction: 'Interested in optimizaion',
      chatRooms: [123, 456, 789],
      liked_users: [
        {
          _id: 1323,
          nickname: 'sjo',
          intra_id: 'sjo',
          image_url: 'goodday',
          campus: '42seoul',
          createdAt: new Date('2015-04-20T15:37:23'),
          hashtags: ['react', 'food'],
          country: 'korea',
          github_id: 'Seojunhwan',
          introduction: 'Interested in optimizaion',
          chatRooms: [123, 456, 789],
          liked_users: [],
          saved_posts: [],
          posts: [],
          n_language: [{ name: 'korea' }],
          l_language: [{ name: 'english' }, { name: 'japanese' }],
          join_data: new Date('2015-04-20T15:37:23'),
        },
        {
          _id: 352,
          nickname: 'jojoo',
          intra_id: 'jojoo',
          image_url: 'goodday',
          campus: '42seoul',
          createdAt: new Date('2015-04-20T15:37:23'),
          hashtags: ['react', 'food'],
          country: 'korea',
          github_id: 'joo',
          introduction: 'Interested in optimizaion',
          chatRooms: [123, 456, 789],
          liked_users: [],
          saved_posts: [],
          posts: [],
          n_language: [{ name: 'korea' }],
          l_language: [{ name: 'english' }, { name: 'japanese' }],
          join_data: new Date('2015-04-20T15:37:23'),
        },
      ],
      saved_posts: [],
      posts: [],
      n_language: [{ name: 'korea' }],
      l_language: [{ name: 'english' }, { name: 'japanese' }],
      join_data: new Date('2015-04-20T15:37:23'),
    };
    const chatData: Chat[] = [
      {
        _id: '123',
        createdAt: '2022-05-13 12:34:56',
        updatedAt: '2022-05-13 13:45:67',
        users: [
          {
            _id: 124352,
            nickname: 'junseo',
            image_url: '/man1.jpeg',
          },
          {
            _id: 124332,
            nickname: 'sjo',
            image_url: '/man1.jpeg',
          },
        ],
        messages: [
          {
            user: 'junseo',
            type: 'text',
            content: 'Hi there, how`s your day going?',
            createdAt: '2022-05-12 12:34:56',
          },
          {
            user: 'sjo',
            type: 'text',
            content: 'Hi, nice to meet you!',
            createdAt: '2022-05-13 13:45:67',
          },
        ],
      },
      {
        _id: '456',
        createdAt: '2022-05-13 12:34:56',
        updatedAt: '2022-05-14 13:45:67',
        users: [
          {
            _id: 124353,
            nickname: 'junseo',
            image_url: '/man2.jpeg',
          },
          {
            _id: 124355,
            nickname: 'jojoo',
            image_url: '/man2.jpeg',
          },
        ],
        messages: [
          {
            user: 'jojoo',
            type: 'text',
            content: 'What are you up to?',
            createdAt: '2022-05-12 12:34:56',
          },
          {
            user: 'junseo',
            type: 'text',
            content: 'I was studying how to use Figma.',
            createdAt: '2022-05-13 13:45:67',
          },
        ],
      },
    ];
    setUserData(userData);
    setIsLoggedIn(true);
    setChatData(chatData);
  }, []);

  useEffect(() => {
    socket.on(SocketEvents.Error, (err) => {
      console.log(err);
    });

    socket.on(SocketEvents.ReqCreateRoom, (res) => {
      // const found = me?.chatRooms.find(
      //   (chatRoom) => res.chatRooms.indexOf(chatRoom) >= 0,
      // );
      console.log(res);
      // setChatData((prev)=>{

      // })
    });

    socket
      .off(SocketEvents.Message)
      .on(SocketEvents.Message, (message: Message) => {
        console.log('messageEvent');
        setChatData((prev) => {
          const filteredChatRoom = prev.filter(
            (chatRoom) => chatRoom._id !== message.chatRoom_id,
          );
          const target = prev.find(
            (chatRoom) => chatRoom._id === message.chatRoom_id,
          );
          if (target) {
            const targetRoomMessages = [...target.messages, message];
            return [
              { ...target, messages: targetRoomMessages },
              ...filteredChatRoom,
            ];
          }
          return prev;
        });
      });
  }, []);

  return <>{children}</>;
}
