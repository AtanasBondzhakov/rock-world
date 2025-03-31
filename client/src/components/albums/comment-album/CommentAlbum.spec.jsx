import { it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import CommentAlbum from './CommentAlbum.jsx';

const mockHandleAddComment = vi.fn();

it('Should display comment form', () => {
    render(<CommentAlbum handleAddComment={mockHandleAddComment} />);

    expect(screen.getByPlaceholderText('Write a comment...')).toBeInTheDocument();
    expect(screen.getByText('Comment')).toBeInTheDocument();
});

it('Should updates textarea value when typing',  () => {
    render(<CommentAlbum handleAddComment={mockHandleAddComment} />);

    const textarea = screen.getByPlaceholderText('Write a comment...');
    fireEvent.change(textarea, { target: { value: 'Great album!' } });

    expect(textarea.value).toBe('Great album!');
});

it('Should calls handleAddComment when submitting a valid comment',async () => {
    render(<CommentAlbum handleAddComment={mockHandleAddComment} />);

    const textarea = screen.getByPlaceholderText('Write a comment...');
    fireEvent.change(textarea, { target: { value: 'Awesome song!' } });

    const button = screen.getByRole('button', { name: 'Comment' });
    fireEvent.click(button);

    await waitFor(() => {
        expect(mockHandleAddComment).toHaveBeenCalledTimes(1);
    });
});

it('Should shows validation error when submitting an empty comment', async () => {
    render(<CommentAlbum handleAddComment={mockHandleAddComment} />);

    const button = screen.getByRole('button', { name: 'Comment' });
    fireEvent.click(button);

    await waitFor(() => {
        expect(screen.getByText('Comment cannot be empty')).toBeInTheDocument();
    });
});