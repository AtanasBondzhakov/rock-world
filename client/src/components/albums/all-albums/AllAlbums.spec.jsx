import { vi, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { useGetAllAlbums } from '../../../api/albumsApi.js';
import AllAlbums from './AllAlbums.jsx';

vi.mock('../../../api/albumsApi.js', () => ({
    useGetAllAlbums: vi.fn()
}));

it('Should show spinner when loading', () => {
    useGetAllAlbums.mockReturnValue({
        albums: [],
        loading: true,
        error: null,
        hasNextPage: false,
    });

    render(
        <MemoryRouter>
            <AllAlbums />
        </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
});

it('Should display album collection if album exist', () => {
    useGetAllAlbums.mockReturnValue({
        albums: [
            { _id: "1", imageUrl: "img1.jpg", title: "Album 1", band: "Band 1", genre: "Rock" },
            { _id: "2", imageUrl: "img2.jpg", title: "Album 2", band: "Band 2", genre: "Metal" }
        ],
        loading: false,
        error: null,
        hasNextPage: false,
    });

    render(
        <MemoryRouter>
            <AllAlbums />
        </MemoryRouter>
    );

    expect(screen.getByText('Album Collection')).toBeInTheDocument();
    expect(screen.getByText('Album 1')).toBeInTheDocument();
    expect(screen.getByText('Album 2')).toBeInTheDocument();
});

it("should display message when no albums are available", () => {
    useGetAllAlbums.mockReturnValue({
        albums: [],
        loading: false,
        error: null,
        hasNextPage: false,
    });

    render(
        <MemoryRouter>
            <AllAlbums />
        </MemoryRouter>
    );

    expect(screen.getByText('There is no albums yet.')).toBeInTheDocument();
});

it("should display an error message when there is an error", () => {
    useGetAllAlbums.mockReturnValue({
        albums: [],
        loading: false,
        error: { message: 'Albums are currently unavailable' },
        hasNextPage: false,
    });

    render(
        <MemoryRouter>
            <AllAlbums />
        </MemoryRouter>
    );

    expect(screen.getByText('Albums are currently unavailable')).toBeInTheDocument();
});

it('Should display pagination', () => {
    useGetAllAlbums.mockReturnValue({
        albums: [
            { _id: "1", imageUrl: "img1.jpg", title: "Album 1", band: "Band 1", genre: "Rock" },
            { _id: "2", imageUrl: "img2.jpg", title: "Album 2", band: "Band 2", genre: "Metal" }
        ],
        loading: false,
        error: null,
        hasNextPage: true,
    });

    render(
        <MemoryRouter>
            <AllAlbums />
        </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: 'Next' })).toBeEnabled();
});

it('Should navigate to the next page when Next is clicked', () => {
    useGetAllAlbums.mockReturnValue({
        albums: [
            { _id: "1", imageUrl: "img1.jpg", title: "Album 1", band: "Band 1", genre: "Rock" },
            { _id: "2", imageUrl: "img2.jpg", title: "Album 2", band: "Band 2", genre: "Metal" }
        ],
        loading: false,
        error: null,
        hasNextPage: true,
    });

    render(
        <MemoryRouter>
            <AllAlbums />
        </MemoryRouter>
    );

    const button = screen.getByRole('button', {name: 'Next'});
    fireEvent.click(button);

    expect(screen.getByText("Album Collection")).toBeInTheDocument();
});

it('Should disable Previous button on the first page', () => {
    useGetAllAlbums.mockReturnValue({
        albums: [{ _id: "1", imageUrl: "img1.jpg", title: "Album 1", band: "Band 1", genre: "Rock" }],
        loading: false,
        error: null,
        hasNextPage: true,
    });

    render(
        <MemoryRouter>
            <AllAlbums />
        </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled();
});