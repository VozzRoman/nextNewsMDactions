import {connectMongoDB} from '../../../helper/connect.js';
import {Posts} from "../../../postsModel/postsModel.js";
import { PostI } from "@/types/types.js";


//---MongoConcet
interface FetchPostsResponse {
	data?: PostI[];
	error?: string;
 }

 //Получаем все посты нарямую с МонгоДБ
export const getAllPostsM = async (): Promise<FetchPostsResponse> => {
	try {
		connectMongoDB();
	const posts = await Posts.find({});
	if(!posts){
		throw new Error("Could not fetch the post");
	}
	//Из за того что с Базы приходят обьекты в JSON формате перед тем как их рендрить нужно распарсить в строку!
	return {
		data: JSON.parse(JSON.stringify(posts))
	};

	} catch (error) {
		console.log('Error while fetching');
		return {
			error: "Error while fetching"
		};
	}
}
interface FetchPostsResponseId {
	data?: PostI | undefined;
	error?: string;
 }


  //Получаем пост по ID нарямую с МонгоДБ
export const getPostByIdM = async (id: string): Promise<FetchPostsResponseId> => {
	try {
		connectMongoDB();
	const post = await Posts.findById(id)
	if(!post){
		throw new Error("Could not find the post");
	}
	
	return {
		//Из за того что с Базы приодят обьекты в JSON формате перед тем как их рендрить нужно распарсить в строку!
		data: JSON.parse(JSON.stringify(post))
	};

	} catch (error) {
		console.log('Error while fetching');
		return {
			error: "Error while fetching"
		};
	}
}