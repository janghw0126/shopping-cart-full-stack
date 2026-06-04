import type { CartItemType } from "../interface/cart";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <div>
      <input type="checkbox" />
      <button>삭제</button>
      <img src={product.image} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <p>{product.price.toLocaleString()}원</p>
      </div>
      <div>
        <button>-</button>
        <span>{quantity}</span>
        <button>+</button>
      </div>
      <hr></hr>
    </div>
  );
}
