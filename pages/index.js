import { getSession } from 'next-auth/react';

// Components
import Center from '../components/Center';
import PlayerControls from '../components/PlayerControls';
import Sidebar from '../components/Sidebar';

/****************************************
 * - Home Page -
 ***************************************/
const Home = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0'>
        <PlayerControls />
      </div>
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
