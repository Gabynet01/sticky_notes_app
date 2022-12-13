import React from 'react';
import { createRoot } from 'react-dom/client';
import 'styles/index.css';
import App from './App';
import { Notes } from "noteContext/StickyNoteContext";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
	<Notes>
		<App />
	</Notes>
</React.StrictMode>);