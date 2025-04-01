import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';

import Footer from './Footer.jsx';
import { MemoryRouter } from 'react-router-dom';

it('Should display footer', () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );

    expect(screen.getByText('rock-world@yahoo.com')).toBeInTheDocument();
    expect(screen.getByText("0888-444-333")).toBeInTheDocument();
    expect(screen.getByText("Springfield, XY 12345")).toBeInTheDocument();
});

it('Should display quick links', () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contacts/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /albums/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /register/i })).toBeInTheDocument();
});