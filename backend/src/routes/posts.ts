import { Router, Request, Response } from "express";
import { createPost, deletePost, getPosts } from "../db/posts/posts";
import { validateBody, validateQuery } from "../middleware";
import { CreatePostSchema, GetPostSchema } from "../dto/posts";
import { HTTP_STATUS } from "../constants/http-status";

const router = Router();

const handleGetPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query as { userId: string };
    const posts = await getPosts(userId);
    res.status(HTTP_STATUS.OK).send(posts);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: "Failed to retrieve posts", error: errorMessage });
  }
};

const handleAddPost = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { title, body, user_id } = payload;
    await createPost(title, body, user_id);
    res
      .status(HTTP_STATUS.CREATED)
      .send({ message: "Post added successfully", data: payload });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: "Failed to add post", error: errorMessage });
  }
};

const handleDeletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  if (!postId) {
    res.status(HTTP_STATUS.BAD_REQUEST).send({ error: "Invalid post ID" });
    return;
  }

  try {
    await deletePost(postId);
    res.status(HTTP_STATUS.OK).send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

router.get("/", validateQuery(GetPostSchema), handleGetPosts);
router.post("/", validateBody(CreatePostSchema), handleAddPost);
router.delete("/:postId", handleDeletePost);

export default router;
