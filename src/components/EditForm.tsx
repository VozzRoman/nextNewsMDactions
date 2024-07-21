"use client"
import { PostI } from '@/types/types';
import React, { FC, useEffect, useState } from 'react';
import ButtonSent from './ButtonSent';
import { updatePost } from '@/app/actions/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';


interface DeitFromProp {
	post: PostI | undefined,
}

const EditForm:FC<DeitFromProp> = ({post}) => {
	const	initialState = {
		message: "",
		errors: {},
	}
//Хук для оброботки ошибок useFormState()
	const [state, formAction] = useFormState(updatePost, initialState);
//------------------------------------------------------------------
const [urlImag, setUrlImag] = useState<string>('');
const [title, setTitle] =useState<string>('');
const [body, setBody] = useState<string>('');

const [hideUrl, setHideUrl] = useState<boolean>(false);
const [hideTitle, setHideTitle] = useState<boolean>(false);
const [hideBody, setHideBody] = useState<boolean>(false);

//Client rediredct-------------------------------------------------
	const router = useRouter();

//Убераем ошибку если поле заплнено
useEffect(() => {
	if(urlImag !== "" ) {
		setHideUrl(false);
	} else {
		setHideUrl(true);
	}
	if(title.length >= 10 ) {
		setHideTitle(false);
	} else {
		setHideTitle(true);
	}
	if(body.length >= 20 ) {
		setHideBody(false);
	} else {
		setHideBody(true);
	}
}, [urlImag, title, body])

//Редирект клиентского копмонента!!!
	useEffect(() => {
		if(state.success){
			setTimeout(() => {
				router.push(`/${post?._id}`);
			}, 3000);
		}
	}, [state, router, post?._id]);

	return (
		<form action={formAction} className='pt-[60px] max-w-[600px] w-full bg-blue-900 p-[20px] rounded-sm'>
			<label className='block mb-2'>
					<h3 className='mb-2 text-white'>Image</h3>
					<input 
					onChange={(e => setUrlImag(e.target.value))}
					 defaultValue={post?.urlImag}
					className='w-full h-[40px] pl-[10px] rounded-sm' type="text" name='urlImag'/>
				</label>

				{/* Віиаодим ошибку пользователю */}
			
				{hideUrl && <div id="name-error" aria-live='polite' aria-atomic='true'>
					{state?.errors?.urlImag && 
					state.errors.urlImag.map((error: string) => (
						<p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
					))}
				</div>}


				<label className='block mb-2'>
					<h3 className='mb-2 text-white'>Title</h3>
					<input 
					onChange={(e => setTitle(e.target.value))} 
					defaultValue={post?.title}
					className='w-full h-[40px] pl-[10px] rounded-sm' type="text" name='title'/>
				</label>
				
				{/* Віиаодим ошибку пользователю */}
			{hideTitle && <div id="name-error" aria-live='polite' aria-atomic='true'>
					{state?.errors?.title && 
					state.errors.title.map((error: string) => (
						<p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
					))}
				</div>}

				<label className='block mb-2'>
				<h3 className='mb-2  text-white'>Body</h3>
					<textarea 
					onChange={(e => setBody(e.target.value))} 
					defaultValue={post?.body}
					className='w-full pl-[10px] rounded-sm' name='body'/>
				</label>

				{/* Віиаодим ошибку пользователю */}
			{hideBody && <div id="name-error" aria-live='polite' aria-atomic='true'>
					{state?.errors?.body && 
					state.errors.body.map((error: string) => (
						<p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
					))}
				</div>}

				{/* <InputForm/> */}
				<p className={`text-center mt-1 mb-1 ${state.error ? 'text-red-600' : state.success ? 'text-green-600' : ''}`}>
  						{state.error ? state.error : state.success ? state.success : ''}
				</p>
				<label className='block mb-2 hidden'>
					<input className='w-full h-[40px] pl-[10px] rounded-sm' type="text" name='id' defaultValue={post?._id}/>
				</label>
				<ButtonSent title='оновити'/>
			</form>
	);
};

export default EditForm;