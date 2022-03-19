// Spotify Api
import useSpotify from '../hooks/useSpotify';

// State
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

// Utils
import { formatDuration } from '../lib/formatDuration';

/****************************************
 * - Song.jsx -
 ***************************************/
const Song = ({ track, order }) => {
  const spotify = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotify.play({
      uris: [track.uri],
    });
  };

  // Render
  return (
    <div
      className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer'
      onClick={playSong}>
      <div className='flex items-center space-x-4'>
        <p>{order + 1}</p>
        <img src={track.album.images[0].url} className='w-10 h-10' />
        <div>
          <p className='w-64 md:w-32 lg:w-64 text-white truncate'>
            {track.name}
          </p>
          <p>{track.artists[0].name}</p>
        </div>
      </div>
      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='hidden md:inline w-40 lg:w-80 truncate'>
          {track.album.name}
        </p>
        <p>{formatDuration(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
