import type { RequestHandler } from "express";
import { validateCreateOrder } from "./orders.schema";
import { createOrder, getOrder as getOrderService } from "./orders.service";

export const postOrder: RequestHandler = async (req, res) => {
  const body = validateCreateOrder(req.body);

  const result = await createOrder(body.products);

  res.status(201).json({
    status: "success",
    message: "주문이 정상적으로 생성되었습니다.",
    data: result,
  });
};

export const getOrder: RequestHandler = async (req, res) => {
  const orderId = Number(req.params.orderId);
  const result = await getOrderService(orderId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
