jest.mock("./orders.repository");

import { AppError } from "@/errors/AppError";
import * as repo from "./orders.repository";
import { getOrder } from "./orders.service";

const mockGetOrderById = repo.getOrderByIdQuery as jest.MockedFunction<
  typeof repo.getOrderByIdQuery
>;
const mockGetOrderProducts =
  repo.getOrderProductsByOrderIdQuery as jest.MockedFunction<
    typeof repo.getOrderProductsByOrderIdQuery
  >;
const mockGetOrderCoupons =
  repo.getOrderCouponsByOrderIdQuery as jest.MockedFunction<
    typeof repo.getOrderCouponsByOrderIdQuery
  >;

const mockOrder = { id: 1, isExpired: false, isRemoteArea: false, deliveryFee: 3000 };
const mockProducts = [
  { id: 1, name: "아메리카노", price: 4500, image: "https://img.com/1.jpg", quantity: 2 },
];
const mockCoupons = [
  {
    id: 1,
    code: "FIXED5000",
    title: "5000원 할인",
    discountType: "fixed" as const,
    discountValue: 5000,
    minimumAmount: 50000,
    expirationDate: "2025-12-31",
  },
];

describe("getOrder", () => {
  beforeEach(() => jest.clearAllMocks());

  it("존재하지 않는 주문이면 NOT_FOUND_ORDER 에러를 던진다", async () => {
    mockGetOrderById.mockResolvedValue(null);

    await expect(getOrder(999)).rejects.toThrow(AppError);
    await expect(getOrder(999)).rejects.toMatchObject({
      code: "NOT_FOUND_ORDER",
    });
  });

  it("주문 정보(products, coupons, isRemoteArea, deliveryFee)를 반환한다", async () => {
    mockGetOrderById.mockResolvedValue(mockOrder);
    mockGetOrderProducts.mockResolvedValue(mockProducts);
    mockGetOrderCoupons.mockResolvedValue(mockCoupons);

    const result = await getOrder(1);

    expect(result).toEqual({
      products: mockProducts,
      coupons: mockCoupons,
      isRemoteArea: false,
      deliveryFee: 3000,
    });
  });

  it("쿠폰이 없어도 빈 배열로 반환한다", async () => {
    mockGetOrderById.mockResolvedValue(mockOrder);
    mockGetOrderProducts.mockResolvedValue(mockProducts);
    mockGetOrderCoupons.mockResolvedValue([]);

    const result = await getOrder(1);

    expect(result.coupons).toEqual([]);
  });
});
