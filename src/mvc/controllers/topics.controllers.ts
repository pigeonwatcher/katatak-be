import { Request, Response, NextFunction } from "express";
const { fetchAllTopics } = require('../models/topics.models');

export async function getAllTopics (req: Request, res: Response, next: NextFunction) {
    try {
        const topics = await fetchAllTopics();
        res.status(200).send({ topics });

    } catch(err) {
        next(err);
    }
}