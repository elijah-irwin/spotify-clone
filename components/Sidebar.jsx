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
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
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
    <div className='text-gray-500 p-5 border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen w-[15rem] hidden md:inline-flex'>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>Your Library</p>
        </button>

        <hr className='border-t-[.1px] border-gray-900' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
          <p>Your Episodes</p>
        </button>

        <hr className='border-t-[.1px] border-gray-900' />

        {/* Playlist Content */}
        {playlists.map(playlist => (
          <p
            key={playlist.id}
            className='cursor-pointer hover:text-white'
            onClick={() => setPlaylistId(playlist.id)}>
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
