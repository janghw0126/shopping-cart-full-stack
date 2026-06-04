import { useEffect, useState } from "react";
import { GetCartApi } from "./api/cartApi";
import { Spinner } from "./common/Spinner";
import type { CartItem } from "./interface/cart";
import { ErrorMessage } from "./common/ErrorMessage";
import { EmptyCart } from "./CartPage/EmptyCart";
import { CartList } from "./CartPage/CartList";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // GET/carts 호출해서 장바구니 api 가져오기
  useEffect(() => {
    GetCartApi(setLoading, setCartItems, setError);
  }, []);

  return loading ? (
    <Spinner />
  ) : error ? (
    <ErrorMessage message={error} />
  ) : cartItems.length !== 0 ? (
    <CartList cartItems={cartItems} />
  ) : (
    <EmptyCart />
  );
}

export default App;
