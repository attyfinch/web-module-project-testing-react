import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

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

test('renders without errors', () => { 
    render(<Show show={testShow} selectedSeason={'none'}/>)      
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null}/>)
    const loading = screen.getByTestId("loading-container")
    const fetchingText = screen.queryByText(/fetching data.../i)
    expect(loading).toBeInTheDocument();
    expect(fetchingText).toBeTruthy();
    expect(fetchingText).toBeInTheDocument();
    expect(fetchingText).toBeVisible();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testShow} selectedSeason={'none'}/>)
    const seasons = screen.queryAllByTestId("season-option")
    expect(seasons).toHaveLength(2);
});

test('handleSelect is called when a season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect}/>)
    const select = screen.getByLabelText(/Select A Season/i);
    fireEvent.change(select, '1');
 
    // Need to learn to use userEvent as well.
    // userEvent.selectOptions(select, ['1']);

    expect(handleSelect).toBeCalled();
    
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={testShow} selectedSeason={"none"}/>)
    let episodes = screen.queryByTestId("episodes-container")
    
    expect(episodes).toBeFalsy();
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={testShow} selectedSeason={1}/>)
    episodes = screen.queryByTestId("episodes-container")

    expect(episodes).toBeTruthy();
    expect(episodes).toBeInTheDocument();
});
