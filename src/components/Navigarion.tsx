import Link from 'next/link';
import React from 'react';

const Navigarion = () => {
	return (
		<ul className='flex text-white'>
			<li className='mr-[10px] hover:text-red-600 duration-200 transition-colors'>
				<Link href='/'>Home</Link>
			</li>
			<li className='mr-[10px] hover:text-red-600 duration-200 transition-colors'>
				<Link href='/blogs'>Add-blog</Link>
			</li>
			<li className='mr-[10px] hover:text-red-600 duration-200 transition-colors'>
				<Link href='/about'>About</Link>
			</li>
		</ul>
	);
};

export default Navigarion;