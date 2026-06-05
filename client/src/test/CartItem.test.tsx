import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CartItem } from "../CartPage/CartItem";
import type { CartItemType } from "../interface/cart";

const mockItem: CartItemType = {
  product: {
    id: 1,
    name: "스타벅스 아메리카노",
    price: 4500,
    image: "https://example.com/image.jpg",
  },
  quantity: 2,
};

const defaultProps = {
  item: mockItem,
  isSelected: false,
  onToggle: vi.fn(),
  onUpdateQuantity: vi.fn(),
  onDeleteItem: vi.fn(),
};

describe("CartItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("상품명, 가격, 수량을 렌더링한다", () => {
    render(<CartItem {...defaultProps} />);
    expect(screen.getByText("스타벅스 아메리카노")).toBeInTheDocument();
    expect(screen.getByText("4,500원")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("+ 버튼 클릭 시 onUpdateQuantity가 quantity + 1로 호출된다", async () => {
    render(<CartItem {...defaultProps} />);
    await userEvent.click(screen.getByText("+"));
    expect(defaultProps.onUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("— 버튼 클릭 시 onUpdateQuantity가 quantity - 1로 호출된다", async () => {
    render(<CartItem {...defaultProps} />);
    await userEvent.click(screen.getByText("—"));
    expect(defaultProps.onUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("수량이 1일 미만일 때 - 버튼 클릭 시 alert를 표시하고 onUpdateQuantity를 호출하지 않는다", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const item = { ...mockItem, quantity: 1 };
    render(<CartItem {...defaultProps} item={item} />);
    await userEvent.click(screen.getByText("—"));
    expect(alertSpy).toHaveBeenCalledWith("최소 1개까지 가능합니다.");
    expect(defaultProps.onUpdateQuantity).not.toHaveBeenCalled();
  });

  it("수량이 99 초과일 때 + 버튼 클릭 시 alert를 표시하고 onUpdateQuantity를 호출하지 않는다", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const item = { ...mockItem, quantity: 99 };
    render(<CartItem {...defaultProps} item={item} />);
    await userEvent.click(screen.getByText("+"));
    expect(alertSpy).toHaveBeenCalledWith("최대 99개까지 가능합니다.");
    expect(defaultProps.onUpdateQuantity).not.toHaveBeenCalled();
  });

  it("삭제 버튼 클릭 후 confirm 확인 시 onDeleteItem이 호출된다", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<CartItem {...defaultProps} />);
    await userEvent.click(screen.getByText("삭제"));
    expect(defaultProps.onDeleteItem).toHaveBeenCalledWith(1);
  });

  it("삭제 버튼 클릭 후 confirm 취소 시 onDeleteItem이 호출되지 않는다", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    render(<CartItem {...defaultProps} />);
    await userEvent.click(screen.getByText("삭제"));
    expect(defaultProps.onDeleteItem).not.toHaveBeenCalled();
  });

  it("이미지 로드 실패 시 대체 텍스트를 표시한다", () => {
    render(<CartItem {...defaultProps} />);
    const img = screen.getByRole("img", { name: "스타벅스 아메리카노" });
    fireEvent.error(img);
    expect(screen.getByText(/이미지를/)).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "스타벅스 아메리카노" }),
    ).not.toBeInTheDocument();
  });
});
