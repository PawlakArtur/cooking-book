export interface IingredientOnList {
	id: string,
	name: string,
}

export interface IingredientDetails {
	id?: string,
	name?: string,
	quantity?: number,
    unit?: IingredientUnit,
    authorId?: string,
}

export enum IingredientUnit {
	kg = 'kg',
	l = 'l',
    pc = 'pc',
    glass = 'glass',
    pinch = 'pinch',
}
