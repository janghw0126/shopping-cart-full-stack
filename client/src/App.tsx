import { Routes, Route, Navigate } from "react-router-dom";
import { OrderCheck } from "./CheckoutPage/OrderCheck";
import { PaymentConfirm } from "./PaymentConfirmPage/PaymentConfirm";
import { CartPage } from "./CartPage/CartPage";

function App() {
  return (
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout/:orderId" element={<OrderCheck />} />
      <Route path="/payment/confirm" element={<PaymentConfirm />} />
      <Route path="*" element={<Navigate to="/cart" replace />} />
    </Routes>
  );
}

export default App;
