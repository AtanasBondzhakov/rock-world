import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import LatestAlbums from "./LatestAlbums";
import { useGetLatestAlbums } from "../../../api/albumsApi";

vi.mock("../../../api/albumsApi", () => ({
    useGetLatestAlbums: vi.fn(),
}));

vi.mock("./latest-albums-carousel/LatestAlbumsCarousel.jsx", () => ({
    default: ({ children }) => <div data-testid="carousel">{children}</div>,
}));

it('Should display latest albums on success', () => {
    useGetLatestAlbums.mockReturnValue({
        latestAlbums: [
            { _id: "1", imageUrl: "https://example.com/album1.jpg" },
            { _id: "2", imageUrl: "https://example.com/album2.jpg" },
        ],
        error: null,
    });

    render(
        <MemoryRouter>
            <LatestAlbums />
        </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Recently Added Albums' })).toBeInTheDocument();
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
});

it('Should display an error message on fail', () => {
    useGetLatestAlbums.mockReturnValue({
        latestAlbums: [],
        error: "Failed to fetch latest albums",
    });

    render(
        <MemoryRouter>
            <LatestAlbums />
        </MemoryRouter>
    );

    expect(screen.getByText('Failed to fetch latest albums')).toBeInTheDocument();
});

