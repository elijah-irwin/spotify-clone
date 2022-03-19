import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// State
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';

// Spotify Api
import useSpotify from '../hooks/useSpotify';

// Icons
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  ArrowCircleLeftIcon,
} from '@heroicons/react/outline';

/****************************************
 * - Sidebar.jsx -
 ***************************************/
const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [_, setPlaylistId] = useRecoilState(playlistIdState);
  const { data: session } = useSession();
  const spotify = useSpotify();

  useEffect(() => {
    if (spotify.getAccessToken()) {
      spotify
        .getUserPlaylists()
        .then(data => setPlaylists(data.body.items))
        .catch(err => console.log(err));
    }
  }, [session, spotify]);

  return (
    <div className='text-gray-500 p-5 overflow-y-scroll scrollbar-hide h-screen min-w-[14rem] max-w-[14rem] hidden md:inline-flex pb-36'>
      <div className='space-y-4 flex-grow'>
        <div className='flex items-center space-x-2 '>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </div>
        <div className='flex items-center space-x-2'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </div>
        <div className='flex items-center space-x-2 '>
          <LibraryIcon className='h-5 w-5' />
          <p>Your Library</p>
        </div>

        <hr className='border-t-[.1px] border-gray-700' />

        <a
          href='https://mak-irwin.netlify.app/'
          className='flex items-center space-x-2 hover:text-white'>
          <ArrowCircleLeftIcon className='h-5 w-5' />
          <p>Back To Portfolio</p>
        </a>

        <hr className='border-t-[.1px] border-gray-700' />

        {/* Playlist Content */}
        {playlists.map(playlist => (
          <p
            key={playlist.id}
            className='cursor-pointer text-gray-300 hover:text-white'
            onClick={() => setPlaylistId(playlist.id)}>
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
