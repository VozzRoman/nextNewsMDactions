/* eslint-disable */
import React from 'react';
// import { createPost } from '../actions/actions';
// import { useFormState } from 'react-dom';
// import ButtonSent from '@/components/ButtonSent';

import { getAllPostsM, getPostByIdM } from '@/app/restApi/restApi';
import { ParamsI } from '@/types/types';
import EditForm from '@/components/EditForm';

// import InputForm from '@/components/InputForm';

export const generateStaticParams = async() => {
	const {data} = await getAllPostsM();
	const generatedId = data;
	if(!generatedId){
		return []
	}

	return generatedId?.map(post => ({
		id: String(post?._id),
	}))
	
}

const Edit = async ({params}: ParamsI) => {

const {data} = await getPostByIdM(params.id);


//----------------------------------------------

	return (
		<div>
			<h1>Редагування</h1>
			<EditForm post={data}/>
		</div>
	);
};

export default Edit;