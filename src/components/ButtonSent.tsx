import React, { FC } from 'react';
import { useFormStatus } from 'react-dom';

interface ButtonSentProp {
	title: string,
}

const ButtonSent: FC<ButtonSentProp> = ({title}) => {
	const {pending} = useFormStatus();
	return (
	
				<button className='w-full p-[10px] bg-slate-600' type='submit'>{pending ? "Loading" : `${title}`}</button>
	
	);
};

export default ButtonSent;