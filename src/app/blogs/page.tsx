"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { createPost } from '../actions/actions';
import { useFormState } from 'react-dom';
import ButtonSent from '@/components/ButtonSent';
import { useRouter } from 'next/navigation';

// import InputForm from '@/components/InputForm';



const Page = () => {
const	initialState = {
	message: "",
	errors: {},
}


//Хук для оброботки ошибок useFormState()
const [state, formAction] = useFormState(createPost , initialState);

//------------------------------------------------------------------
const [urlImag, setUrlImag] = useState<string>('');
const [title, setTitle] =useState<string>('');
const [body, setBody] = useState<string>('');
//Hide error--------------------------------------------------------
const [hideUrl, setHideUrl] = useState<boolean>(false);
const [hideTitle, setHideTitle] = useState<boolean>(false);
const [hideBody, setHideBody] = useState<boolean>(false);
const [serverInfoHide, setServerInfoHide] = useState<boolean>(true);
//Client rediredct-------------------------------------------------
const router = useRouter();

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

//Сброс формі 
useEffect(() => {
	if (state.success) {
	  return resetForm(); // Сбрасываем форму при успешной отправке
	}
 }, [state]);

 //Редирект клиентского копмонента!!!
 useEffect(() => {
	if(state.success){
		setTimeout(() => {
			router.push(`/`);
		}, 3000);
	}
}, [state, router]);

 const resetForm = () => {
	setUrlImag('');
	setTitle('');
	setBody('');
 };


//----------------------------------------------

	return (
		<div>
			<h1>add Blog</h1>
			<form action={formAction} className='pt-[60px] max-w-[600px] w-full bg-blue-900 p-[20px] rounded-sm'>
			<label className='block mb-2'>
					<h3 className='mb-2 text-white'>Image</h3>
					<input value={urlImag} onChange={(e => setUrlImag(e.target.value))} className='w-full h-[40px] pl-[10px] rounded-sm' type="text" name='urlImag'/>
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
					<input value={title} onChange={(e => setTitle(e.target.value))} className='w-full h-[40px] pl-[10px] rounded-sm' type="text" name='title'/>
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
					<textarea value={body} onChange={((e) => setBody(e.target.value))} className='w-full pl-[10px] rounded-sm' name='body'/>
				</label>

				{/* Віиаодим ошибку пользователю */}
				{hideBody && <div id="name-error" aria-live='polite' aria-atomic='true'>
					{state?.errors?.body && 
					state.errors.body.map((error: string) => (
						<p className='mt-2 text-sm text-red-500' key={error}>{error}</p>
					))}
				</div>}

				{/* <InputForm/> */}
				{serverInfoHide && <p className={`text-center mt-1 mb-1 ${state.error ? 'text-red-600' : state.success ? 'text-green-600' : ''}`}>
  						{state.message ? state.error : state.success ? state.success : ''}
				</p>}
			
				{/* <button className='w-full p-[10px] bg-slate-600' type='submit'>Send</button> */}
				<ButtonSent title='відправити'/>
			</form>
			
		</div>
	);
};

export default Page;