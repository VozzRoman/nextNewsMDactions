import { PostI } from '@/types/types';
import Link from 'next/link';
import React, { FC } from 'react';
interface PostProp {
	item: PostI,
}

const Post: FC<PostProp> = ({item}) => {
	return (
		<div className='flex'>
			<Link className='cursor-pointer underline' href={`/${item._id}`}>
			<h2 className='text-xl'>{item.title}</h2>
			</Link>
		</div>
	)
};

export default Post;