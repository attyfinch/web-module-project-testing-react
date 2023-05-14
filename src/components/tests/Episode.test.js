import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

let testEpisode = {
    id: 1,
    name: 'brad', 
    image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
    season: 1,
    number: 1,
    summary: 'the best episode ever',
    runtime: 1
};

let testEpisode1 = {
    id: 1,
    name: 'brad', 
    image: null,
    season: 1,
    number: 1,
    summary: 'the best episode ever',
    runtime: 1
};

test("renders without error", () => {
    render(<Episode episode={testEpisode}/>)
});

test("renders the summary test passed as prop", () => {
    render(<Episode episode={testEpisode}/>)
    const summary = screen.queryByText('the best episode ever')

    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).not.toBeFalsy();
    expect(summary).toHaveTextContent(/the best episode ever/i);

});

test("renders default image when image is not defined", () => {
    render(<Episode episode={testEpisode1}/>)

    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')

    expect(image).toBeInTheDocument();
});

// ----- EXAMPLE EPISODE TEST OBJECT -----
// const exampleEpisodeData = {
//   airdate: "2016-07-15",
//   airstamp: "2016-07-15T12:00:00+00:00",
//   airtime: "",
//   id: 553946,
//   image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
//   name: "Chapter One: The Vanishing of Will Byers",
//   number: 1,
//   rating: { average: 8.2 },
//   runtime: 49,
//   season: 1,
//   summary:
//     "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
//   type: "regular",
//   url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
// };
