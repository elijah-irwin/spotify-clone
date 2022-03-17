import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

/****************************************
 * - UserMenu.jsx -
 ***************************************/
const UserMenu = () => {
  const { data: session } = useSession();

  return (
    <header className='absolute top-5 right-8 text-white'>
      <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
        <Image
          src={session.user.image}
          alt='User photo.'
          className='rounded-full'
          height={35}
          width={35}
        />
        <h2>{session.user.name}</h2>
        <ChevronDownIcon className='h-5 w-5' />
      </div>
    </header>
  );
};

export default UserMenu;
