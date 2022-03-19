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
            className='font-bold text-green-400 underline transition hover:text-green-500'>
            mak
          </a>
        </h2>
        <h3 className='font-bold text-xl pb-2'>Disclaimer</h3>
        <p className='pb-2'>
          Turns out the developer mode of the Spotify API only gives users I
          explicitly input permission to authorize with this app, making it a
          less than ideal portfolio project. 😭
        </p>
        <p className='pb-6'>
          For now, please refer to the Github{' '}
          <a
            href='https://github.com/irwinmck/spotify-clone'
            className='text-green-400 underline font-bold transition hover:text-green-500'>
            repo
          </a>{' '}
          for screen caps of the project.
        </p>
        <h3 className='font-bold text-xl pb-2'>Features</h3>
        <div className='grid grid-cols-3 gap-x-10 gap-y-1 pb-6'>
          <p>Spotify Auth</p>
          <p>Playlist Syncing</p>
          <p>Song Selection</p>
          <p>Volume Controls</p>
          <p>Album Artwork</p>
          <p>Session Persistence</p>
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
