export interface IrecipeOnList {
	id: string,
	name: string,
	type: IrecipeType,
}

export interface IrecipeDetails {
	id: string,
	name: string,
	type: IrecipeType,
	ingredients: string,
	description: string,
	executionTime: number,
}

export enum IrecipeType {
	breakfast,
	lunch,
	dinner,
	snack,
	supper,
}
