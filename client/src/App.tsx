import { useEffect, useState } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

async function GetCardApi(
  setLoading: (value: boolean) => void,
  setCartItems: (value: CartItem[]) => void,
) {
  const res = await fetch("/carts");
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const response = await res.json();
  const { status, data } = response;

  if (status === "success") {
    setCartItems(data);
    setLoading(false);
  } else {
    throw new Error("장바구니 상품 목록을 성공적으로 불러오지 못했습니다.");
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // GET/carts 호출해서 장바구니 api 가져오기
  useEffect(() => {
    GetCardApi(setLoading, setCartItems);
  }, []);

  return <></>;
}

export default App;
