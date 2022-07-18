import { atom } from 'recoil';
import { CallUser } from '../../interfaces/call.interface';

export const callState = atom<CallUser[]>({
  key: 'callState',
  default: [],
});

export const callListState = atom<{ roomNo: string }[]>({
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

export const callInfoState = atom<{ roomNo: string }>({
  key: 'callInfoState',
  default: { roomNo: '' },
});

export const localStreamState = atom<MediaStream | null>({
  key: 'localStreamState',
  default: null,
});
