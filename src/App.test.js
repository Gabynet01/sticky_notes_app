import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

const testStickyNote = {
    id: 1, text: 'Testing sticky note with this content', x: 100, y: 100, width: 200, height: 200
}

test('renders without crashing', () => {
    render(<App />);
});

test("renders sticky note from local storage", () => {
    localStorage.setItem("sticky-note-data", JSON.stringify([testStickyNote]))
    render(<App />);
    const note = screen.getByText(testStickyNote.text)
    expect(note).toBeInTheDocument();
});
