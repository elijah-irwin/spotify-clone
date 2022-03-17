// Spotify Api
import useSpotify from '../hooks/useSpotify';

// Utils
import { formatDuration } from '../lib/formatDuration';

const Song = ({ track, order }) => {
  const spotify = useSpotify();

  return (
    <div className='grid grid-cols-2'>
      <div className='flex items-center space-x-4'>
        <p>{order + 1}</p>
        <img src={track.album.images[0].url} className='w-10 h-10' />
        <div>
          <p>{track.name}</p>
          <p>{track.artists[0].name}</p>
        </div>
      </div>
      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline'>{track.album.name}</p>
        <p>{formatDuration(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
