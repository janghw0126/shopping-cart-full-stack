import express from "express";
import { getCoupons, getOrder, postOrder } from "./orders.controller";

export const ordersRouter = express.Router();

ordersRouter.post("/", postOrder);
ordersRouter.get("/:orderId/coupons", getCoupons);
ordersRouter.get("/:orderId", getOrder);
