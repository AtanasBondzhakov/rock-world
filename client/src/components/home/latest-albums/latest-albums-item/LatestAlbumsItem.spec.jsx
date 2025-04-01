import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LatestAlbumsItem from './LatestAlbumsItem.jsx';

const mockAlbum = {
    _id: "123",
    imageUrl: "https://example.com/album.jpg"
};

it('Should display album image', () => {
    render(
        <MemoryRouter>
            <LatestAlbumsItem {...mockAlbum} />
        </MemoryRouter>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockAlbum.imageUrl);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'image');
});

it('Should display correct album link', () => {
    render(
        <MemoryRouter>
            <LatestAlbumsItem {...mockAlbum} />
        </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/albums/${mockAlbum._id}/details`);
});