import { useEffect, useState } from "react";
import { GetCartApi, UpdateQuantityApi } from "./api/cartApi";
import { Spinner } from "./common/Spinner";
import type { CartItemType } from "./interface/cart";
import { ErrorMessage } from "./common/ErrorMessage";
import { EmptyCart } from "./CartPage/EmptyCart";
import { CartList } from "./CartPage/CartList";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // GET/carts 호출해서 장바구니 api 가져오기
  useEffect(() => {
    GetCartApi(setLoading, setCartItems, setError);
  }, []);

  async function updateQuantity(productId: number, quantity: number) {
    const success = await UpdateQuantityApi(productId, quantity);
    if (success) {
      setCartItems(cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  }

  return loading ? (
    <Spinner />
  ) : error ? (
    <ErrorMessage message={error} />
  ) : cartItems.length !== 0 ? (
    <CartList
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
    />
  ) : (
    <EmptyCart />
  );
}

export default App;
