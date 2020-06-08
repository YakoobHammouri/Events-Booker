import React from 'react';
import './Theme/Css/App.css';
import BaseLayout from './Components/Layout/Base/BaseLayout';
import swal from 'sweetalert';

function App() {
	swal('Hello world!');

	return (
		<div className="App">
			<BaseLayout />
		</div>
	);
}

export default App;
