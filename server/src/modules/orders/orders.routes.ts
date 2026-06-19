import express from "express";
import { postOrder } from "./orders.controller";

export const ordersRouter = express.Router();

ordersRouter.post("/", postOrder);
