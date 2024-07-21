import React, { FC, ReactNode } from 'react';

interface ContainerProp {
	children: ReactNode;
}

const Container:FC<ContainerProp> = ({children}) => {
	return (
		<div className='max-w-[1140px] m-auto pl-[15px] pr-[15px]'>
			{children}
		</div>
	);
};

export default Container;