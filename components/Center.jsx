import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

// Components
import UserMenu from './UserMenu';
import Songs from './Songs';

// State
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';

// Spotify Api
import useSpotify from '../hooks/useSpotify';

// Background gradients.
const bgColors = [
  'from-indigo-500',
  'from-blue-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
  'from-orange-500',
];

/****************************************
 * - Center.jsx -
 ***************************************/
const Center = () => {
  const [bgColor, setBgColor] = useState(null);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const playlistId = useRecoilValue(playlistIdState);
  const spotify = useSpotify();

  // Change gradient background on playlist selection.
  useEffect(() => {
    setBgColor(shuffle(bgColors).pop());
  }, [playlistId]);

  // Re-fetch playlist when playlistId changes.
  useEffect(() => {
    spotify
      .getPlaylist(playlistId)
      .then(data => setPlaylist(data.body))
      .catch(err => console.log(err));
  }, [playlistId, spotify, setPlaylist]);

  // Render
  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
      <UserMenu />
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${bgColor} h-80 text-white p-8`}>
        <img
          src={playlist?.images?.[0]?.url}
          alt='Playlist icon.'
          className='h-52 w-52 shadow-2xl'
        />
        <div>
          <p className='font-bold'>PLAYLIST</p>
          <h1 className='text-7xl font-bold pb-5'>{playlist?.name}</h1>
          <p className='text-slate-300 '>{playlist?.description}</p>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
