import React from 'react';

const AppBanner = ({ handleToggleDarkMode }) => {
	return (
		<div className='header'>
			<h1>Sticky Notes App</h1>
			<button
				onClick={() =>
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='save'
			>
				Change Theme
			</button>
		</div>
	);
};

export default AppBanner;
