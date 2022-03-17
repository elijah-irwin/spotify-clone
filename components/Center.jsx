import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

// Components
import UserMenu from './UserMenu';

const bgColors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
  'from-orange-500',
  'from-pink-500',
];

const Center = () => {
  const [bgColor, setBgColor] = useState(null);

  useEffect(() => {
    setBgColor(shuffle(bgColors).pop());
  }, []);

  return (
    <div className='flex-grow'>
      <UserMenu />
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${bgColor} h-80 text-white p-8`}>
        <h1>hello</h1>
      </section>
    </div>
  );
};

export default Center;