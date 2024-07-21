"use server";


import { revalidatePath } from "next/cache";
import {z} from 'zod';
import { Posts } from "../../../postsModel/postsModel";

const userSchema = z.object({
	urlImag: z.string().url('має бути лінк на фото'),
	title: z.string()
	.min(10, 'не меньше 10 символів')
	.max(1000, 'більше 100 не треба'),
	//если есть mail
	// email: z.string().email('invalid email'),
	body: z.string().min(20, "не меньше 20 символів"),
	// id: z.string(),

})

// Типизация функции createPost
interface PrevState {
	message?: string | null;
	errors?: {
	  urlImag?: string[];
	  title?: string[];
	  body?: string[];
	};
	

 }
 
 //action Создать Пост-----------------------------------

export const createPost = async (prevState: PrevState , data: FormData) => {

	// const {title, body} = Object.fromEntries(data);
	const rawFormData = {
		urlImag: data.get('urlImag'),
		title: data.get('title'),
		body: data.get('body'),
	 }

	 //Валидация-----------
	 const validateFields = userSchema.safeParse(rawFormData);
	 if(!validateFields.success){
		return {
			message: "Some errors",
			errors: validateFields.error?.flatten()?.fieldErrors, 
		
		}
	 }
	
	 //-----------------------
	 try {
		const newPost = await Posts.create(rawFormData);
		if(!newPost){
				throw new Error(`HTTP error!`);
		}
			//Обновления кеша 
			revalidatePath('/');
			return {
				success:'пост додав успішно'
			}
			
	 } catch (error) {
		console.log(error);
		console.error('Fetch error:', error);
				return {		
			error: "не можу додати щось з сервером!!",	
		}
	 }

	 

	}

//Delete------

	export const removePost = async (value: string) => {
	try {
		  const deletePost = await Posts.findByIdAndDelete(value);
		  if(!deletePost){
				  throw new Error(`error!`);
		  }	
					 revalidatePath('/');
			return {
				success: 'видалив успишно'
			}
		
	} catch (error) {
		console.log(error);
			return {
				error: ' не можу видалилт, щось з сервером'
			}
	}

	}


	//Update post

	export const updatePost = async (prevState: PrevState, data: FormData) => {

		// const {title, body} = Object.fromEntries(data); //-- можно достать все свойства через Object.fromEntries(data)
		const rawFormData = {
			urlImag: data.get('urlImag'),
			title: data.get('title'),
			body: data.get('body'),
			id: data.get('id'),
		 }
	
		//  Валидация-----------
	
		 const validateFields = userSchema.safeParse(rawFormData);
		 
		 if(!validateFields.success){
			return {
				message: "Some errors",
				errors: validateFields.error?.flatten()?.fieldErrors 
			}
		 }
		
		 //-----------------------
		 try {
		const updatePost = await Posts.findByIdAndUpdate(data.get('id'),rawFormData ,{new:true});
				 if(!updatePost){
					throw new Error('Error!')
				 }
				  revalidatePath('/');
				  revalidatePath(`/${data.get('id')}`);
				return {
					success:'пост оновив успішно'
				}
		 } catch (error) {
			console.log(error);
				return {
					error: "не можу оновити щось з сервером!!"
			}
		 }
	
		
	
		}