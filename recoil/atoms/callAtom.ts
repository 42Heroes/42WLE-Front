import { atom } from 'recoil';
import { Call, CallUser } from '../../interfaces/call.interface';

export const callListState = atom<Call[]>({
  key: 'callListState',
  default: [],
});

export const peerConnectionState = atom<{
  [key: string]: RTCPeerConnection | null;
}>({
  key: 'peerConnectionState',
  default: {},
});

export const connectedUserListState = atom<CallUser[]>({
  key: 'connectedUserListState',
  default: [],
});

export const isCallingState = atom({
  key: 'isCallingState',
  default: false,
});

export const roomNoState = atom({
  key: 'roomNoState',
  default: '',
});

export const localStreamState = atom<MediaStream | null>({
  key: 'localStreamState',
  default: null,
});
