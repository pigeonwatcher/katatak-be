import { Request, Response, NextFunction } from "express";
import fetchUsers from "../models/users.models";

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
  } catch {}
}
