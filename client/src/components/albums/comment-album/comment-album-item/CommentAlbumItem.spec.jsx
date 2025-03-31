import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import CommentAlbumItem from './CommentAlbumItem.jsx';
import { dateFormatter } from '../../../../utils/dateUtil.js';

vi.mock("../../../../utils/dateUtil", () => ({
    dateFormatter: vi.fn(() => 'March 31, 2025'),
}));

const mock = {
    author: { email: 'user@example.com' },
    _createdOn: '2025-03-31T12:00:00.000Z',
    comment: 'First comment'
}

it('Should display author email', () => {
    render(<CommentAlbumItem {...mock} />);

    expect(screen.getByText(`${mock.author.email} - ${dateFormatter()}`)).toBeInTheDocument();
});

it('Should display comment', () => {
    render(<CommentAlbumItem {...mock} />);

    expect(screen.getByText(mock.comment)).toBeInTheDocument();
});