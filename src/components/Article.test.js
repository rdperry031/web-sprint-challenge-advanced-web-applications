import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';


const testArticle = {
    id:"tui",
    headline: "gabagool",
    author: "Tony S",
    summary: "Fugget about it",
    body: "Dingy I'm tellin' you rhubaahb Bangah Jo-Jeezly got in a gaum Powrtland stove up dooryahd from away, paypuh bowee batrees owt Have a good one. hahd tellin' not knowin', p'dayduhs scrod You is sum wicked suhmart over t'. Lobstah buggin' bogan railed 'em gettin' ugly bluebries ayuhpawt Jo-Jeezly, front dooryahd huck naw got in a gaum bluebries."
};

const testArticleSansAuthor = {
    id:"tui",
    headline: "gabagool",
    author: "",
    summary: "Fugget about it",
    body: "Dingy I'm tellin' you rhubaahb Bangah Jo-Jeezly got in a gaum Powrtland stove up dooryahd from away, paypuh bowee batrees owt Have a good one. hahd tellin' not knowin', p'dayduhs scrod You is sum wicked suhmart over t'. Lobstah buggin' bogan railed 'em gettin' ugly bluebries ayuhpawt Jo-Jeezly, front dooryahd huck naw got in a gaum bluebries."
};

test('renders component without errors', ()=> {
    render(<Article article={testArticle}/>)
})

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>);
    const headline = screen.queryByText(/gabagool/);
    const author = screen.queryByText(/tony s/i);
    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();

});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticleSansAuthor}/>)
    const assPress = screen.queryByText(/associated press/i);
    expect(assPress).toBeInTheDocument()
});

test('executes handleDelete when the delete button is pressed',async ()=> {
    const handleDelete = jest.fn()
    render(<Article article={testArticle} handleDelete={handleDelete}/>)
    const headline = screen.queryByText(/gabagool/i)
    const deleteButton = screen.queryByTestId(/deleteButton/i)
    expect(headline).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
    userEvent.click(deleteButton)
    await waitFor(() => {
        expect(handleDelete).toHaveBeenCalled()
    })
    
});


//Task List:
//1. Complete all above tests. Create test article data when needed.