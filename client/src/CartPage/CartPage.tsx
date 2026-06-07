import { useNavigate } from "react-router-dom";
import {
  DeleteCartItemApi,
  GetCartApi,
  UpdateQuantityApi,
} from "../api/cartApi";
import { Spinner } from "../common/Spinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { EmptyCart } from "./EmptyCart";
import { CartList } from "./CartList";
import { useCart } from "../hooks/useCart";

export function CartPage() {
  const navigate = useNavigate();
  const { loading, error, cartItems, updateQuantity, deleteItem } = useCart({
    fetchCart: GetCartApi,
    updateCart: UpdateQuantityApi,
    deleteCart: DeleteCartItemApi,
  });

  function goToCheckout(
    selectedCount: number,
    totalQuantity: number,
    totalAmount: number,
  ) {
    navigate("/checkout", {
      state: { selectedCount, totalQuantity, totalAmount },
    });
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
