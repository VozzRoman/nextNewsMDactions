import { getAllPostsM } from '@/app/restApi/restApi';
import React from 'react';
import Post from './Post';

const ListPosts = async () => {
	const postsM = await getAllPostsM();
	console.log("MDdata", postsM.data);
	return (
		<ul>
			{postsM.data?.map(post => <Post key={post?._id} item={post}/>)}
		</ul>
	);
};

export default ListPosts;