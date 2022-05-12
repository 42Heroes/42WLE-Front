import { rest } from 'msw';

export const getChats = rest.get('/me/chats', (req, res, ctx) => {
     const dummyData = [
         {
             _id:"990901",
             createdAt:"2022-05-12 12:34:56",
             updatedAt:"2022-05-13 13:45:67",
             users:[{nickname: 'sjo'}, {nickname: 'junseo'}],
             messages: [{user: 'sjo', type: 'text', content: 'Hi there, how`s your day going?', createdAt: "2022-05-12 12:34:56"}, {user: 'junseo', type: 'text', content: 'Hi, nice to meet you!', createdAt: "2022-05-13 13:45:67"}]
         },{
            _id:"12345",
            createdAt:"2022-05-13 12:34:56",
            updatedAt:"2022-05-14 13:45:67",
            users:[{nickname: 'sjo'}, {nickname: 'jojoo'},{nickname: 'yeoyoon'}],
            messages: [{user: 'sjo', type: 'text', content: 'Hi there, how`s your day going?', createdAt: "2022-05-12 12:34:56"}, {user: 'junseo', type: 'text', content: 'Hi, nice to meet you!', createdAt: "2022-05-13 13:45:67"}]
        }
     ]
  return res(ctx.json(dummyData));
});