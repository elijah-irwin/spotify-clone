import { getProviders, signIn } from 'next-auth/react';

/****************************************
 * - Login Page -
 ***************************************/
const Login = ({ providers }) => {
  return (
    <div className='min-h-screen bg-black grid xl:grid-cols-2 items-center gap-15 px-5 md:px-40 py-10 xl:px-80 gap-y-20  text-white'>
      {/* Left */}
      <div>
        <h1 className='font-bold text-5xl md:text-8xl mb-6'>Spotify Clone</h1>
        <h2 className='mb-10 '>
          by{' '}
          <a
            href='https://mak-irwin.netlify.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-bold text-green-400 underline cursor-pointer transition hover:text-green-500'>
            mak
          </a>
        </h2>
        <h3 className='font-bold text-xl pb-2'>Disclaimer</h3>
        <p className='pb-2'>
          The following project only allows you to control the playback state of
          your current Spotify session.
        </p>
        <p className='pb-6'>
          <span className='font-bold'>Ex. </span>Open and play a song on any
          actual Spotify player (web-player, desktop app, or mobile app). You
          can then use this Spotify Clone project to browse your playlists, play
          songs, and change the volume. Actual playback will occur in the
          originally selected player.
        </p>
        <h3 className='font-bold text-xl pb-2'>Features</h3>
        <div className='grid grid-cols-3 gap-x-10 gap-y-1 pb-6'>
          <p>Spotify Auth</p>
          <p>Playlist Syncing</p>
          <p>Song Selection</p>
          <p>Volume Controls</p>
          <p>Album Artwork</p>
          <p>Session Persistance</p>
        </div>
        <h3 className='font-bold text-xl pb-2'>Tools</h3>
        <div className='grid grid-cols-3 gap-x-10 gap-y-1'>
          <p>Next</p>
          <p>NextAuth</p>
          <p>TailwindCSS</p>
          <p>Recoil</p>
          <p>Spotify API</p>
          <p>Vercel</p>
        </div>
      </div>

      {/* Right */}
      <div className='flex flex-col align-middle items-center'>
        <img
          src='https://links.papareact.com/9xl'
          alt='Spotify Logo'
          className='w-52'
        />
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button
              className='bg-[#21b454] text-white py-3 px-5 m-10 rounded-full'
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              Login with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
