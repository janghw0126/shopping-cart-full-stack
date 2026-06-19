import express from "express";
import { postOrder, getOrder } from "./orders.controller";

export const ordersRouter = express.Router();

ordersRouter.post("/", postOrder);
ordersRouter.get("/:orderId", getOrder);
