"use client";
import React, { useEffect, useState } from 'react';


const InputForm = () => {

	const [urlImag, setUrlImag] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [body, setBody] = useState<string>('');
	const [bthStaus, setBthStatus] = useState<boolean>(true);
	
	console.log("TITLE", title);

	useEffect(() => {
		if(urlImag !== "" && title !== "" && body !== ""){
				setBthStatus(false);
		}
	}, [urlImag, title, body]);

	return (
		<>
			<label className='block mb-4'>
					<h3 className='mb-2 text-white'>Image</h3>
					<input onChange={(e => setUrlImag(e.target.value))} className='w-full h-[40px] pl-[10px] rounded-sm' type="text" name='urlImag' value={urlImag}/>
				</label>
				<label className='block mb-4'>
					<h3 className='mb-2 text-white'>Title</h3>
					<input onChange={(e => setTitle(e.target.value))} className='w-full h-[40px] pl-[10px] rounded-sm' type="text" name='title' value={title}/>
				</label>
				<label className='block mb-5'>
				<h3 className='mb-2  text-white'>Body</h3>
					<textarea onChange={(e => setBody(e.target.value))} className='w-full pl-[10px] rounded-sm' name='body' value={body}/>
				</label>
				<button disabled={bthStaus} className='w-full p-[10px] bg-slate-600' type='submit'>Send</button>
		</>
	);
};

export default InputForm;