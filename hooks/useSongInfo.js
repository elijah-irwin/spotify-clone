import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from './useSpotify';

/****************************************
 * - useSongInfo Hook -
 ***************************************/
const useSongInfo = () => {
  const [songInfo, setSongInfo] = useState();
  const currentTrackId = useRecoilValue(currentTrackIdState);
  const spotify = useSpotify();

  useEffect(() => {
    if (currentTrackId) {
      fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
        headers: { Authorization: `Bearer ${spotify.getAccessToken()}` },
      })
        .then(res => res.json())
        .then(data => setSongInfo(data))
        .catch(err => console.log(err));
    }
  }, [currentTrackId, spotify]);

  return songInfo;
};

export default useSongInfo;
