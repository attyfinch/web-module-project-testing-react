import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')

const testShow = {
    name: 'the brad show',
    summary: 'thriller about a man named Brad',
    seasons: [
        {
            id: 0,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        }
    ]
};

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    const showContainer = await screen.findByTestId("show-container")
    expect(showContainer).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    
    const showContainer = await screen.findByTestId("show-container")
    expect(showContainer).toBeInTheDocument();

    const select = screen.getByLabelText(/Select A Season/i);
    expect(select).toBeInTheDocument();

    await waitFor(() => {
        const seasons = screen.queryAllByTestId("season-option");
        expect(seasons).toHaveLength(2);
    
    })
});


test('displayFunc is called when show button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>)
    const button = screen.getByRole("button")
    fireEvent.click(button)

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();    
    })
});
