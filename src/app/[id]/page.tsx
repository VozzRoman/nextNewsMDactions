/* eslint-disable */
import { ParamsI, PostI} from '@/types/types';
import React from 'react';
import { getAllPostsM, getPostByIdM } from '../restApi/restApi';

import Link from 'next/link';
import ButtonDelete from '@/components/ButtonDelete';



// export const generateMetadata =  async ({params}: ParamsI) => {
// 	const {data} = await getPostByIdM(params.id);
// 	return {
// 		title: data?.title,
// 	}
// }
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

const Page = async ({params}: ParamsI) => {

	const {data} = await getPostByIdM(params.id);
	return (
		<div>
		<div className='flex'>
			<div className='max-w-[400px] h-[300px] flex-shrink-0'>
				<img className='w-full h-full object-cover' src={data?.urlImag} alt={data?.title} />
			</div>
			<div className='ml-[20px]'>
				<h1 className='text-2xl font-bold'>{data?.title}</h1>
				<p className=''>{data?.body}</p>
			</div>
			
		</div>
		<div className='flex justify-between'>
		<Link className='underline' href='/'>назад</Link>
		<div className='flex'>
		
			<Link href={`${data?._id}/edit`} className='bg-red-500 mr-[10px] hover:bg-red-700 duration-200 transition-colors rounded-sm p-2 text-white' type='submit'>Редагувати</Link>

		<ButtonDelete posId={data?._id!}/>

		</div>
		</div>
		</div>
	);
};

export default Page;