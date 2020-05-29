import React from 'react';
import logo from './../../../assets/logo.svg';
export default ({ showlogo }: { showlogo: boolean }) => {
	const logoimg = showlogo ? <img alt="GSG" src={logo} /> : '';
	return <div>{logoimg}</div>;
};
