import { atom } from 'recoil';
import { CallUser } from '../../interfaces/call.interface';

export const callState = atom<CallUser[]>({
  key: 'callState',
  default: [],
});

export const callListState = atom({
  key: 'callListState',
  default: [],
});
