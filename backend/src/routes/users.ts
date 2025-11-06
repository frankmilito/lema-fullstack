import { Router, Request, Response } from "express";
import { getUsers, getUsersCount } from "../db/users/users";
import { validateQuery } from "../middleware";
import { paginateUserSchema } from "../dto/user";
import { HTTP_STATUS } from "../constants/http-status";

const router = Router();

const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize } = req.query as { pageNumber: string; pageSize: string };
    const pageNum = Number(pageNumber) || 0;
    const pageSz = Number(pageSize) || 4;

    const users = await getUsers(pageNum, pageSz);
    res.status(HTTP_STATUS.OK).send(users);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: "Failed to retrieve users", error: errorMessage });
  }
};

const handleGetUsersCount = async (req: Request, res: Response) => {
  try {
    const count = await getUsersCount();
    res.status(HTTP_STATUS.OK).send({ count });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: "Failed to retrieve users count", error: errorMessage });
  }
};

router.get("/", validateQuery(paginateUserSchema), handleGetUsers);
router.get("/count", handleGetUsersCount);

export default router;
