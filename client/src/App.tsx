import { useEffect, useState } from "react";
import { GetCartApi } from "./api/cartApi";
import type { CartItem } from "./interface/cart";

function App() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // GET/carts 호출해서 장바구니 api 가져오기
  useEffect(() => {
    GetCartApi(setLoading, setCartItems);
  }, []);

  return loading ? "로딩중" : (cartItems===""? 상품 없음 : </>);
}

export default App;
