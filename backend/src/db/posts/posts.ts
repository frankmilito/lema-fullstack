import { randomInt } from "crypto";
import { connection } from "../connection";
import {
  deletePostTemplate,
  insertPostTemplate,
  selectPostsTemplate,
} from './query-tamplates';
import { Post } from './types';

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        console.error('Error fetching posts:', error);
        reject(error);
        return;
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: string): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], function (error) {
      if (error) {
        reject(error);
      }
      if (this.changes === 0) {
        reject(new Error('Post not found'));
      }
      resolve();
    });
  });

export const createPost = (
  title: string,
  body: string,
  userId: string
): Promise<Post> =>
  new Promise((resolve, reject) => {
    const created_at = new Date().toISOString();
    const timestamp = Date.now();
    const random = randomInt(1000000, 9999999);
    const id = timestamp * 10000000 + random;

    connection.run(
      insertPostTemplate,
      [id, title, body, userId, created_at],
      function (error) {
        if (error) {
          console.error('Error creating post:', error);
          reject(error);
          return;
        }
        const newPost: Post = {
          id,
          user_id: userId,
          title,
          body,
          created_at,
        };
        resolve(newPost);
      }
    );
  });
