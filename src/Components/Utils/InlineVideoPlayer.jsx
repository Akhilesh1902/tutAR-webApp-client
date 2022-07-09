import { useRef, useEffect } from 'react';

const InlineVideoPlayer = ({ flip }) => {
  const video_ref = useRef();

  useEffect(() => {
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
    getVideo();
  }, []);

  return (
    <video
      playsInline
      autoPlay
      loop
      ref={video_ref}
      className={`w-full h-screen ${flip ? 'video-t' : ''}`}></video>
  );
};

export default InlineVideoPlayer;
