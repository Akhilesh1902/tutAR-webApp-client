import { useRef, useEffect } from 'react';

const InlineVideoPlayer = ({ flip, active }) => {
  const video_ref = useRef();

  const getVideo = async () => {
    const stream = await navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .catch((err) => {
        alert('No Camera found!');
        console.log(err);
      });
    video_ref.current.srcObject = stream;
  };
  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    if (active) getVideo();
    else video_ref.current.srcObject = null;
  }, [active]);

  return (
    <video
      playsInline
      autoPlay
      loop
      muted
      ref={video_ref}
      className={`w-full h-screen object-cover object-center ${
        flip ? 'video-t' : ''
      }`}></video>
  );
};

export default InlineVideoPlayer;
