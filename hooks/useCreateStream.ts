import { RefObject, useEffect, useState } from 'react';

export const useCreateMediaStream = (
  localVideoRef: RefObject<HTMLVideoElement>,
) => {
  const [userMediaStream, setUserMediaStream] = useState<MediaStream | null>(
    null,
  );

  const stopMediaStream = () => {
    if (userMediaStream) {
      userMediaStream.getTracks().forEach((track) => track.stop());
    }
  };

  const createMediaStream = async () => {
    if (!userMediaStream) {
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
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setUserMediaStream(stream);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const createMediaStream = async () => {
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
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setUserMediaStream(stream);
      } catch (error) {
        console.log(error);
      }
    };
    createMediaStream();
  }, [localVideoRef]);

  return { userMediaStream, createMediaStream, stopMediaStream };
};
