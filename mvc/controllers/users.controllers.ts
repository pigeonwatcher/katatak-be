import { Request, Response, NextFunction } from "express";
import { fetchUsers, fetchUserById } from "../models/users.models";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const results = await fetchUsers();
    const users = results.rows;
    res.status(200);
    res.send({ users });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user_id } = req.params;
    const results: any = await fetchUserById(user_id);
    const user = results.rows[0];

    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
}
