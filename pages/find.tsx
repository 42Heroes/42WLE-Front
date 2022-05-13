import UserCard from '../components/common/UserCard';
import dummyData from '../library/dummydata';
import { UserProps } from '../interfaces/user_interfaces';

export default function find() {
  return (
    <div>
      <UserCard userCardData={dummyData} />
    </div>
  );
}
