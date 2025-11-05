import { Router, Request, Response } from "express";
import { createPost, deletePost, getPosts, updatePost } from "../db/posts/posts";
import { getUserById } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId?.toString();
    if (!userId) {
      res.status(400).send({ error: "userId is required" });
      return;
    }
    const posts = await getPosts(userId);
    res.send(posts || []);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = req.body;
    if (!title || !body || !userId) {
      res.status(400).send({ error: 'Title, body, and user id are required' });
      return;
    }

    const userExists = await getUserById(userId);
    if (!userExists) {
      res.status(400).send({ error: 'User not found' });
      return;
    }
    const newPost = await createPost(title, body, userId);
    res.status(201).send(newPost);
  } catch (error) {
    console.log(error, 'er')
    res.status(500).send({
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
});

router.delete('/:postId', async (req: Request, res: Response) => {
  const postId = req.params.postId;

  if (!postId) {
    res.status(400).send({ error: 'Invalid post ID' });
    return;
  }

  try {
    await deletePost(postId);
    res.status(200).send({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).send({
      error: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
});

router.put('/:postId', async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const { title, body, userId } = req.body;

  if (!postId) {
    res.status(400).send({ error: 'Invalid post ID' });
    return;
  }

  if (!title || !body) {
    res.status(400).send({ error: 'Title and body are required' });
    return;
  }

  try {
    await updatePost(postId, title, body);
    res.status(200).send({ message: 'Post updated successfully' });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Post not found or unauthorized'
    ) {
      res.status(404).send({ error: error.message });
    } else {
      res.status(500).send({
        error: error instanceof Error ? error.message : 'Internal Server Error',
      });
    }
  }
});

export default router;
