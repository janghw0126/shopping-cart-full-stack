import type { CartItemType } from "../interface/cart";

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onToggle: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onDeleteItem: (productId: number) => void;
}

export function CartItem({ item, isSelected, onToggle, onUpdateQuantity, onDeleteItem }: CartItemProps) {
  const { product, quantity } = item;

  function handleDelete() {
    if (confirm(`'${product.name}'을(를) 삭제하시겠습니까?`)) {
      onDeleteItem(product.id);
    }
  }

  function handleDecrease() {
    if (quantity <= 1) {
      alert("최소 1개까지 가능합니다.");
      return;
    }
    onUpdateQuantity(product.id, quantity - 1);
  }

  function handleIncrease() {
    if (quantity >= 99) {
      alert("최대 99개까지 가능합니다.");
      return;
    }
    onUpdateQuantity(product.id, quantity + 1);
  }

  return (
    <div>
      <input type="checkbox" checked={isSelected} onChange={onToggle} />
      <button onClick={handleDelete}>삭제</button>
      <img src={product.image} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <p>{product.price.toLocaleString()}원</p>
      </div>
      <div>
        <button onClick={handleDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
      <hr></hr>
    </div>
  );
}
