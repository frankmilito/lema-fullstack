export const selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;

export const deletePostTemplate = `
DELETE 
FROM posts 
WHERE id = ? 
`;

export const insertPostTemplate = `
INSERT 
INTO posts 
(id, title, body, user_id, created_at) VALUES (?, ?, ?, ?, ?)`;

export const updatePostTemplate = `
  UPDATE posts 
  SET title = ?, body = ?
  WHERE id = ?
`;