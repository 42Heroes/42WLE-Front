import { ConstructionOutlined } from '@mui/icons-material';
import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import CommonLayout from '../components/layout/CommonLayout';
import { userState } from '../recoil/atoms';
import UserCard from '../components/common/UserCard';
import { User } from '../interfaces/user.interface';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Find() {
  const userData: User = {
    _id: 124352,
    nickname: 'junseo',
    intra_id: 'junseo',
    image_url: 'https://cdn.intra.42.fr/users/jojoo.jpg',
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
        n_language: [{ name: 'korean' }],
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
        n_language: [{ name: 'korean' }],
        l_language: [{ name: 'english' }, { name: 'japanese' }],
        join_data: new Date('2015-04-20T15:37:23'),
      },
    ],
    saved_posts: [],
    posts: [],
    n_language: [{ name: 'korean' }],
    l_language: [{ name: 'english' }, { name: 'japanese' }],
    join_data: new Date('2015-04-20T15:37:23'),
  };
  // const [isLiked, setIsLiked] = useState(false);

  // const handleClickLike = () => {
  //   setIsLiked(!isLiked);
  // };
  // const fetchMydataAPI = () => {
  //   return axios.get('http://req2back');
  // };
  // const { data } = useQuery<User>('myData', fetchMydataAPI);

  return (
    <Container>
      <UserCard userCardData={userData} myData={null} />
      <UserCard userCardData={userData} myData={null} />
      <UserCard userCardData={userData} myData={null} />
      <UserCard userCardData={userData} myData={null} />
      <UserCard userCardData={userData} myData={null} />
      <UserCard userCardData={userData} myData={null} />
    </Container>
  );
}
const Container = styled.div`
  margin: 5rem 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3rem;
  column-gap: 2rem;
`;
Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};
