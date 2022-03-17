import { getSession } from 'next-auth/react';
import Head from 'next/head';

// Components
import Center from '../components/Center';
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

      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div>{/* Player Controls */}</div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default Home;
