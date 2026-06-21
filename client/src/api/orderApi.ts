const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function createOrderApi(
  products: { id: number; quantity: number }[],
) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ products }),
  });

  const json = await res.json();

  if (json.status !== "success") {
    throw new Error(json.code);
  }

  return json.data.orderId as number;
}
