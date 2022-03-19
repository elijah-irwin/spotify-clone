import { useState, useEffect, useCallback } from 'react';
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';

// Auth
import { useSession } from 'next-auth/react';

// State
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

// Hooks
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';
import { debounce } from 'lodash';

/****************************************
 * - PlayerControls.jsx -
 ***************************************/
const PlayerControls = () => {
  const spotify = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(100);
  const songInfo = useSongInfo();

  const handlePlayPause = () => {
    spotify.getMyCurrentPlaybackState().then(data => {
      if (data?.body?.is_playing) {
        spotify.pause();
        setIsPlaying(false);
      } else {
        spotify.play();
        setIsPlaying(true);
      }
    });
  };

  const debounceAdjustVolume = useCallback(
    debounce(volume => spotify.setVolume(volume).catch(err => alert(err)), 500),
    []
  );

  useEffect(() => {
    if (spotify.getAccessToken() && !currentTrackId && !songInfo) {
      spotify.getMyCurrentPlayingTrack().then(data => {
        setCurrentTrackId(data.body?.item?.id);
      });
      spotify.getMyCurrentPlaybackState().then(data => {
        setIsPlaying(data.body?.is_playing);
      });
      setVolume(100);
    }
  }, [
    currentTrackId,
    spotify,
    session,
    songInfo,
    setIsPlaying,
    setCurrentTrackId,
  ]);

  useEffect(() => debounceAdjustVolume(volume), [volume]);

  // Render
  return (
    <div className='h-24 bg-black border-t border-gray-900 text-white grid grid-cols-3 px-2 md:px-8'>
      {/* Left */}
      <div className='flex items-center space-x-4'>
        <img
          src={songInfo?.album?.images?.[0]?.url}
          className='hidden md:inline h-10 w-10'
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p className='text-gray-500 text-sm'>
            {songInfo?.artists?.[0]?.name}
          </p>
        </div>
      </div>

      {/* Middle */}
      <div className='flex items-center justify-center space-x-10'>
        <SwitchHorizontalIcon className='dead-button hidden md:inline' />
        <RewindIcon className='dead-button' />
        {isPlaying ? (
          <PauseIcon
            className='button w-10 h-10 fill-white'
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className='button w-10 h-10 fill-white'
            onClick={handlePlayPause}
          />
        )}
        <FastForwardIcon className='dead-button' />
        <ReplyIcon className='dead-button hidden md:inline' />
      </div>

      {/* Right */}
      <div className='flex items-center space-x-3 justify-end pr-5 md:pr-0'>
        <VolumeDownIcon className='w-5 h-5' />
        <input
          type='range'
          min={0}
          max={100}
          className='w-16 md:w-28 cursor-pointer bg-green-700'
          onChange={e => setVolume(Number(e.target.value))}
          value={volume}
        />
        <VolumeUpIcon className='w-5 h-5' />
      </div>
    </div>
  );
};

export default PlayerControls;
