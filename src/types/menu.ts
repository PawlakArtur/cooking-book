export enum ImenuItemVisibility {
	Authorized,
	Unauthorized,
	Always,
}

export enum ImenuType {
	Link,
	Function,
}

export interface ImenuLink {
	name: string,
	visibility: ImenuItemVisibility,
	type: ImenuType,
	path: string,
}

export interface ImenuFunction {
	name: string,
	visibility: ImenuItemVisibility,
	type: ImenuType,
	handler: () => void
}

export type ImenuItem = ImenuLink | ImenuFunction;
