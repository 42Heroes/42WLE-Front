import { useRecoilState } from 'recoil';
import { localStreamState } from '../recoil/atoms';

export const useCreateMediaStream = () => {
  const [userMediaStream, setUserMediaStream] =
    useRecoilState(localStreamState);

  const stopMediaStream = () => {
    if (userMediaStream) {
      userMediaStream.getTracks().forEach((track) => track.stop());
    }
    setUserMediaStream(null);
  };

  const createMediaStream = async () => {
    if (!userMediaStream?.active) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: {
              min: 640,
              ideal: 1280,
            },
            height: {
              min: 400,
              ideal: 720,
            },
          },
          audio: {
            autoGainControl: false,
            channelCount: 2,
            echoCancellation: false,
            latency: 0,
            noiseSuppression: false,
            sampleRate: 48000,
            sampleSize: 16,
            // volume: 1.0,
          },
        });
        setUserMediaStream(stream);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { userMediaStream, createMediaStream, stopMediaStream };
};
