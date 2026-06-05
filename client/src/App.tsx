import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { DeleteCartItemApi, GetCartApi, UpdateQuantityApi } from "./api/cartApi";
import { Spinner } from "./common/Spinner";
import type { CartItemType } from "./interface/cart";
import { ErrorMessage } from "./common/ErrorMessage";
import { EmptyCart } from "./CartPage/EmptyCart";
import { CartList } from "./CartPage/CartList";
import { OrderCheck } from "./OrderCheckPage/OrderCheck";

function CartPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

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

  function goToCheckout(selectedCount: number, totalQuantity: number, totalAmount: number) {
    navigate("/checkout", { state: { selectedCount, totalQuantity, totalAmount } });
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <CartList
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
      onDeleteItem={deleteItem}
      onOrderCheck={goToCheckout}
    />
  );
}

function App() {
  return (
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<OrderCheck />} />
      <Route path="*" element={<Navigate to="/cart" replace />} />
    </Routes>
  );
}

export default App;
