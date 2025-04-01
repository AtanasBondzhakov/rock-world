import { it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PageNotFound from './PageNotFound.jsx';

const renderComponent = (
    <MemoryRouter>
        <PageNotFound />;
    </MemoryRouter>
);

it('should render page', () => {
    render(renderComponent)

    expect(screen.getByText("Oops! Looks like this page doesn't exist... 😔")).toBeInTheDocument();
    expect(screen.getByText("Go Back to Rock Home")).toBeInTheDocument();
});

it('should display button back to home', () => {
    render(renderComponent);

    const linkElement = screen.getByRole('link', { name: /Go Back to Rock Home/i });
    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute('href', '/');

    fireEvent.click(linkElement);

    expect(window.location.pathname).toBe('/');
})