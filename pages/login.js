import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';

/****************************************
 * - Login Page -
 ***************************************/
const Login = ({ providers }) => {
  return (
    <div className='h-screen bg-black flex flex-col items-center justify-center'>
      <img
        src='https://links.papareact.com/9xl'
        alt='Spotify Logo'
        className='w-52'
      />
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
            className='bg-[#18D860] text-white py-3 px-5 m-10 rounded-full'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            Login with {provider.name}
          </button>
        </div>
      ))}
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
