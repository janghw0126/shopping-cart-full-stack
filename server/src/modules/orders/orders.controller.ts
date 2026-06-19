import type { RequestHandler } from "express";
import { validateCreateOrder, validatePatchOrder } from "./orders.schema";
import { createOrder, getCoupons as getCouponsService, getOrder as getOrderService, patchOrder as patchOrderService } from "./orders.service";

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

export const getCoupons: RequestHandler = async (req, res) => {
  const orderId = Number(req.params.orderId);
  const result = await getCouponsService(orderId);

  res.status(200).json({
    status: "success",
    data: result,
  });
};

export const patchOrder: RequestHandler = async (req, res) => {
  const orderId = Number(req.params.orderId);
  const body = validatePatchOrder(req.body);
  const result = await patchOrderService(orderId, body);

  res.status(200).json({
    status: "success",
    data: result,
  });
};
