"use client";
import { removePost } from '@/app/actions/actions';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';


interface ButtonDeleteProp {
	posId: string,
}

const ButtonDelete: FC<ButtonDeleteProp> = ({posId}) => {

		// const result = removePost.bind(null, posId);
		// console.log("ERROR-Delte", result);
		const [error, setError] = useState<string | null>(null);
		const [success, setSuccess] = useState<string | null>(null);
		const router = useRouter();
console.log("Er----->",error);
console.log("Suc----->",success);
		const handleDelete = async (id: string) => {
		  const result = await removePost(id!);
		  if (result?.error) {
			alert(result?.error)
			 setError(result?.error); // Очистить ошибку, если запрос успешен
		  } else {
			alert(result?.success)
			 setSuccess(result?.success!); // Установить ошибку, если запрос не успешен
			 router.push('/');

		  }
		};
		const boundHandleDelete = handleDelete.bind(null, posId);

	return (
	
	
		<form action={boundHandleDelete}>
			<button className='bg-red-500 hover:bg-red-700 duration-200 transition-colors rounded-sm p-2 text-white' type='submit'>Видалити</button>
		</form>
		
	
	);
};

export default ButtonDelete;