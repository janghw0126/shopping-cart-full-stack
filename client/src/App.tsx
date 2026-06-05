import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { Spinner } from "./common/Spinner";
import { ErrorMessage } from "./common/ErrorMessage";
import { EmptyCart } from "./CartPage/EmptyCart";
import { CartList } from "./CartPage/CartList";
import { OrderCheck } from "./CheckoutPage/OrderCheck";

function CartPage() {
  const navigate = useNavigate();
  const { loading, error, cartItems, updateQuantity, deleteItem } = useCart();

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
