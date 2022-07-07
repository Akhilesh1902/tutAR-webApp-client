import React, { useRef, useEffect } from 'react';

const InlineVideoPlayer = () => {
  const video_ref = useRef();

  useEffect(() => {
    const getVideo = async () => {
      const stream = await navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
        })
        .catch((err) => {
          console.log(err);
        });
      video_ref.current.srcObject = stream;
    };
    getVideo();
  }, []);

  return (
    <video
      playsInline
      autoPlay
      loop
      ref={video_ref}
      className='w-full '></video>
  );
};

export default InlineVideoPlayer;
