export interface CallUser {
  socketId: string;
  stream: MediaStream;
}

export interface PCS {
  [key: string]: RTCPeerConnection;
}
