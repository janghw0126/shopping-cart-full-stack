interface CartHeaderProps {
  itemCount: number;
}

export function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <header>
      <h1>장바구니</h1>
      <p>현재 {itemCount}종류의 상품이 담겨있습니다.</p>
    </header>
  );
}
