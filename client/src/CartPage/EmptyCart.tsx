import { Header } from "../common/Header";
import { Button } from "../common/Button";
import "./EmptyCart.css";

export function EmptyCart() {
  return (
    <div className="empty-cart">
      <Header />
      <div className="empty-cart__body">
        <h2 className="empty-cart__heading">장바구니</h2>
        <p className="empty-cart__message">장바구니에 담은 상품이 없습니다.</p>
      </div>
      <div className="empty-cart__footer">
        <Button label="주문 확인" disabled />
      </div>
    </div>
  );
}
