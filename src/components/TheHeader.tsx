import React from 'react';
import Container from './Container';
import Logo from './Logo';
import Navigarion from './Navigarion';

const TheHeader = () => {
	return (
		<header className='bg-gradient-to-b from-blue-500 to-gray-700'>
			<Container>
				<div className='h-[60px] flex items-center justify-between'>
					<Logo/>
					<Navigarion/>
				</div>
			</Container>
			
		</header>
	);
};

export default TheHeader;