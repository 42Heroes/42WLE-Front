import { atom } from 'recoil';
import { CallUser, PCS } from '../../interfaces/call.interface';

export const callState = atom<CallUser[]>({
  key: 'callState',
  default: [],
});

export const pcsState = atom<PCS>({
  key: 'pcs',
  default: {},
});
