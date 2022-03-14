import Head from 'next/head';
import { signOut } from 'next-auth/react';

// Components
import Sidebar from '../components/Sidebar';

// Home Page Component
const Home = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Spotify Clone</title>
        <meta
          name='description'
          content='Spotify clone for educational purposes.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Sidebar />
        {/* Center */}
        <button className='text-white' onClick={() => signOut()}>
          Logout
        </button>
      </main>

      <div>{/* Player Controls */}</div>
    </div>
  );
};

export default Home;
