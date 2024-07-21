export interface PostI {
	_id?: string,
	title: string,
	body: string,
	viewa: number,
	urlImag: string,
}

export interface ParamsI {
	params: {
		id: string;
	 };
}