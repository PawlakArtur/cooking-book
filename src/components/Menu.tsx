import React from 'react';
import { Link } from 'react-router-dom';
import { menuConfig } from '../config';
import { UseIsUserLogged } from '../hooks';
import { ImenuItem, ImenuItemVisibility, ImenuLink, ImenuFunction } from '../types';

const Menu = () => {
	const isUserLogged = UseIsUserLogged(); 
	const getMenuItems = () => {
		return menuConfig.filter((item: ImenuItem): boolean => {
			switch (item.visibility) {
				case ImenuItemVisibility.Always:
					return true;
				case ImenuItemVisibility.Authorized:
					return isUserLogged;
				case ImenuItemVisibility.Unauthorized:
					return !isUserLogged;
				default:
					return false;
			}
		}).map((item: ImenuLink | ImenuFunction, index: number) => {
			if ((item as ImenuLink).path) {
				return (
					<li key={`menu_item_${index}`} className="menu__item">
						<Link to={(item as ImenuLink).path}>{item.name}</Link>
					</li>
				);
			}
			return (
				<li key={`menu_item_${index}`} className="menu__item">
					<span onClick={(item as ImenuFunction).handler}>{item.name}</span>
				</li>
				);
		});
	};
	return (
        <nav className="menu">
			<ul className="menu__container">
				{getMenuItems()}
			</ul>
        </nav>
	);
};

export default Menu;
