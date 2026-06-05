import { useEffect, useState } from "react";
import { DeleteCartItemApi, GetCartApi, UpdateQuantityApi } from "./api/cartApi";
import { Spinner } from "./common/Spinner";
import type { CartItemType } from "./interface/cart";
import { ErrorMessage } from "./common/ErrorMessage";
import { EmptyCart } from "./CartPage/EmptyCart";
import { CartList } from "./CartPage/CartList";
import { OrderCheck } from "./OrderCheckPage/OrderCheck";

interface OrderInfo {
  selectedCount: number;
  totalQuantity: number;
  totalAmount: number;
}

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

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

  async function deleteItem(productId: number) {
    const success = await DeleteCartItemApi(productId);
    if (success) {
      setCartItems(cartItems.filter((item) => item.product.id !== productId));
    }
  }

  function goToOrderCheck(selectedCount: number, totalQuantity: number, totalAmount: number) {
    setOrderInfo({ selectedCount, totalQuantity, totalAmount });
  }

  if (orderInfo) {
    return (
      <OrderCheck
        selectedCount={orderInfo.selectedCount}
        totalQuantity={orderInfo.totalQuantity}
        totalAmount={orderInfo.totalAmount}
        onBack={() => setOrderInfo(null)}
      />
    );
  }

  return loading ? (
    <Spinner />
  ) : error ? (
    <ErrorMessage message={error} />
  ) : cartItems.length !== 0 ? (
    <CartList
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
      onDeleteItem={deleteItem}
      onOrderCheck={goToOrderCheck}
    />
  ) : (
    <EmptyCart />
  );
}

export default App;
