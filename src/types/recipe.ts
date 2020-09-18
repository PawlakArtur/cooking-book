export interface IrecipeOnList {
	id: string,
	name: string,
	type: IrecipeType,
}

export interface IrecipeDetails {
	id?: string,
	name?: string,
	type?: IrecipeType,
	ingredients?: string,
	description?: string,
	executionTime?: number,
	authorId?: string,
}

export enum IrecipeType {
	breakfast = 'breakfast',
	lunch = 'lunch',
	dinner = 'dinner',
	snack = 'snack',
	supper = 'supper',
}
