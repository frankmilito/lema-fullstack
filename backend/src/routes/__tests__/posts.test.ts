import request from 'supertest';
import express, { Application } from 'express';
import postsRouter from '../posts';
import * as postsDb from '../../db/posts/posts';

jest.mock('../../db/posts/posts');

const app: Application = express();
app.use(express.json());
app.use('/posts', postsRouter);

describe('Posts Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /posts - Create Post', () => {
        it('should create a post successfully', async () => {
            const mockPost = {
                id: 12345678901234567,
                user_id: '1',
                title: 'Test Post',
                body: 'This is a test post content',
                created_at: '2024-01-01T00:00:00.000Z',
            };

            (postsDb.createPost as jest.Mock).mockResolvedValue(mockPost);

            const response = await request(app)
                .post('/posts')
                .send({
                    title: 'Test Post',
                    body: 'This is a test post content',
                    user_id: '1',
                })
                .expect(201);

            expect(response.body).toMatchObject({
                message: 'Post added successfully',
                data: {
                    title: 'Test Post',
                    body: 'This is a test post content',
                    user_id: '1',
                },
            });

            expect(postsDb.createPost).toHaveBeenCalledWith(
                'Test Post',
                'This is a test post content',
                '1'
            );
        });

        it('should return 400 when validation fails', async () => {
            const response = await request(app)
                .post('/posts')
                .send({
                    title: 'AB',
                    body: 'Test',
                    user_id: '1',
                })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(postsDb.createPost).not.toHaveBeenCalled();
        });

        it('should return 400 when required fields are missing', async () => {
            const response = await request(app)
                .post('/posts')
                .send({
                    title: 'Test Post',
                })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(postsDb.createPost).not.toHaveBeenCalled();
        });

        it('should return 400 when database operation fails', async () => {
            (postsDb.createPost as jest.Mock).mockRejectedValue(
                new Error('Database error')
            );

            const response = await request(app)
                .post('/posts')
                .send({
                    title: 'Test Post',
                    body: 'This is a test post content',
                    user_id: '1',
                })
                .expect(400);

            expect(response.body).toMatchObject({
                message: 'Failed to add post',
                error: 'Database error',
            });
        });
    });

    describe('DELETE /posts/:postId - Delete Post', () => {
        it('should delete a post successfully', async () => {
            (postsDb.deletePost as jest.Mock).mockResolvedValue(undefined);

            const response = await request(app)
                .delete('/posts/12345678901234567')
                .expect(200);

            expect(response.body).toEqual({
                message: 'Post deleted successfully',
            });

            expect(postsDb.deletePost).toHaveBeenCalledWith('12345678901234567');
        });

        it('should return 400 when postId is missing', async () => {
            const response = await request(app)
                .delete('/posts/')
                .expect(404);

            expect(postsDb.deletePost).not.toHaveBeenCalled();
        });

        it('should return 500 when post is not found', async () => {
            (postsDb.deletePost as jest.Mock).mockRejectedValue(
                new Error('Post not found')
            );

            const response = await request(app)
                .delete('/posts/99999999999999999')
                .expect(500);

            expect(response.body).toHaveProperty('error', 'Post not found');
            expect(postsDb.deletePost).toHaveBeenCalledWith('99999999999999999');
        });

        it('should return 500 when database operation fails', async () => {
            (postsDb.deletePost as jest.Mock).mockRejectedValue(
                new Error('Database connection error')
            );

            const response = await request(app)
                .delete('/posts/12345678901234567')
                .expect(500);

            expect(response.body).toHaveProperty('error', 'Database connection error');
        });
    });
});

