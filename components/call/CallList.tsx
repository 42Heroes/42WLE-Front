import { useRecoilState } from 'recoil';
import { callListState } from '../../recoil/atoms/callAtom';
import CallCard from './CallCard';

export default function CallList() {
  const [callList, setCallList] = useRecoilState(callListState);
  return <CallCard />;
}
