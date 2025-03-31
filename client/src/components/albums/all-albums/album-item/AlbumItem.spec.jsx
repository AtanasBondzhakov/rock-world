import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AlbumItem from './AlbumItem.jsx';

const mock = {
    _id: '123',
    imageUrl: 'https://example.com/album-cover.jpg',
    title: 'Test Album',
    band: 'Test Band',
    genre: 'Rock'
};

it('Should display image', () => {
    render(
        <MemoryRouter>
            <AlbumItem {...mock} />
        </MemoryRouter>
    );

    const image = screen.getByRole('img', { name: 'album-cover' });

    expect(image).toBeInTheDocument();
});

it('Should display correct album details', () => {
    render(
        <MemoryRouter>
            <AlbumItem {...mock} />;
        </MemoryRouter>
    );

    expect(screen.getByText(mock.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mock.band}`)).toBeInTheDocument();
    expect(screen.getByText(`/${mock.genre}/`)).toBeInTheDocument();
    expect(screen.getByText('More Info')).toBeInTheDocument();
});

it('Should not display image', () => {
    const noImageAlbum = { ...mock, imageUrl: undefined };

    render(
        <MemoryRouter>
            <AlbumItem {...noImageAlbum} />;
        </MemoryRouter>
    );

    screen.debug()
    const image = screen.getByRole('img');

    expect(image).not.toHaveAttribute('src', '')
})