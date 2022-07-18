export enum SocketEvents {
  Authorization = 'Authorization',
  Message = 'Message',
  ReqInitialData = 'ReqInitialData',
  Error = 'Error',
  ReqCreateRoom = 'ReqCreateRoom',

  Offer = 'Offer',
  Answer = 'Answer',
  Candidate = 'Candidate',
  IceCandidate = 'IceCandidate',
  RequestCall = 'RequestCall',
  AcceptCall = 'AcceptCall',
  RejectCall = 'RejectCall',
  ExitUser = 'ExitUser',
  EndCall = 'EndCall',
}
