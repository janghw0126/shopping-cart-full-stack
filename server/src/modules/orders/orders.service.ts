import { AppError } from "@/errors/AppError";
import type { CartItem } from "@/type";
import { isCouponUsable, selectTopTwoCoupons } from "./orders.domain";
import type { OrderProduct } from "./orders.schema";
import {
  createOrderCouponsQuery,
  createOrderProductsQuery,
  createOrderQuery,
  getAllCouponsQuery,
  getOrderByIdQuery,
  getOrderCouponsByOrderIdQuery,
  getOrderProductsByOrderIdQuery,
  getProductWithStockQuery,
  getProductsByIdsQuery,
  reserveProductsQuery,
} from "./orders.repository";

const BASE_DELIVERY_FEE = 3_000;

export const createOrder = async (orderProducts: OrderProduct[]) => {
  // 상품 존재 확인, 재고 확인
  for (const item of orderProducts) {
    const product = await getProductWithStockQuery(item.id);
    if (!product) throw new AppError("NOT_EXIST_PRODUCT");
    if (product.stock <= 0) throw new AppError("OUT_OF_STOCK");
  }

  // 상품 예약하고 재고 차감
  await reserveProductsQuery(orderProducts);

  // 쿠폰 조회, 상품 정보 조회
  const [coupons, products] = await Promise.all([
    getAllCouponsQuery(),
    getProductsByIdsQuery(orderProducts.map((i) => i.id)),
  ]);

  const domainCartItems: CartItem[] = orderProducts.map((item) => ({
    product: products.find((p) => p.id === item.id)!,
    quantity: item.quantity,
  }));

  const orderTotal = domainCartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  // 쿠폰 선택
  const selectedCoupons = selectTopTwoCoupons(
    coupons,
    domainCartItems,
    orderTotal,
    BASE_DELIVERY_FEE,
  );

  // 주문 레코드 생성
  const order = await createOrderQuery();

  // 주문 상품 저장
  const orderProductsWithPrice = orderProducts.map((item) => ({
    ...item,
    price: products.find((p) => p.id === item.id)!.price,
  }));
  await createOrderProductsQuery(order.id, orderProductsWithPrice);

  // 주문 쿠폰 저장
  if (selectedCoupons.length > 0) {
    await createOrderCouponsQuery(
      order.id,
      selectedCoupons.map((c) => c.id),
    );
  }

  return { orderId: order.id };
};

export const getCoupons = async (orderId: number) => {
  const order = await getOrderByIdQuery(orderId);
  if (!order) throw new AppError("NOT_FOUND_ORDER");

  const [coupons, orderProducts] = await Promise.all([
    getAllCouponsQuery(),
    getOrderProductsByOrderIdQuery(orderId),
  ]);

  const orderTotal = orderProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );
  const now = new Date();

  return coupons.map((coupon) => ({
    ...coupon,
    isCouponUsable: isCouponUsable(coupon, orderTotal, now),
  }));
};

export const getOrder = async (orderId: number) => {
  const order = await getOrderByIdQuery(orderId);
  if (!order) throw new AppError("NOT_FOUND_ORDER");

  const [products, coupons] = await Promise.all([
    getOrderProductsByOrderIdQuery(orderId),
    getOrderCouponsByOrderIdQuery(orderId),
  ]);

  return {
    products,
    coupons,
    isRemoteArea: order.isRemoteArea,
    deliveryFee: order.deliveryFee,
  };
};
