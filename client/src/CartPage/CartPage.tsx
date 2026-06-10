import { useNavigate } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { EmptyCart } from "./EmptyCart";
import { CartList } from "./CartList";
import { useCart } from "../hooks/useCart";
import {
  deleteCartItemApi,
  getCartApi,
  updateQuantityApi,
} from "../api/cartApi";

export function CartPage() {
  const navigate = useNavigate();
  const { loading, error, cartItems, updateQuantity, deleteItem } = useCart({
    fetchCart: getCartApi,
    updateCart: updateQuantityApi,
    deleteCart: deleteCartItemApi,
  });

  function goToCheckout() {
    navigate("/checkout");
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
