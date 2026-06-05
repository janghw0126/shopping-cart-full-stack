import { useState } from "react";
import styled from "@emotion/styled";
import type { CartItemType } from "../types/cart";
import { Checkbox } from "../common/Checkbox";

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onToggle: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onDeleteItem: (productId: number) => void;
}

const Wrapper = styled.div`
  padding: 16px 0;
  border-top: 1px solid #eee;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  border: 1px solid #ddd;
  background: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 2px;
  font-size: 12px;
`;

const ProductRow = styled.div`
  display: flex;
  gap: 16px;
`;

const ProductImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ImageFallback = styled.div`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #888;
  text-align: center;
  flex-shrink: 0;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.p`
  font-size: 12px;
  color: #0a0d13;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #0000001a;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityDisplay = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: 16px;
`;

export function CartItem({
  item,
  isSelected,
  onToggle,
  onUpdateQuantity,
  onDeleteItem,
}: CartItemProps) {
  const { product, quantity } = item;
  const [imgError, setImgError] = useState(false);

  function handleDelete() {
    if (confirm(`'${product.name}'을(를) 삭제하시겠습니까?`)) {
      onDeleteItem(product.id);
    }
  }

  function handleDecrease() {
    if (quantity <= 1) {
      alert("최소 1개까지 가능합니다.");
      return;
    }
    onUpdateQuantity(product.id, quantity - 1);
  }

  function handleIncrease() {
    if (quantity >= 99) {
      alert("최대 99개까지 가능합니다.");
      return;
    }
    onUpdateQuantity(product.id, quantity + 1);
  }

  return (
    <Wrapper>
      <TopRow>
        <Checkbox checked={isSelected} onChange={onToggle} />
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      </TopRow>
      <ProductRow>
        {imgError ? (
          <ImageFallback>이미지를<br />불러올 수<br />없습니다</ImageFallback>
        ) : (
          <ProductImage
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
          />
        )}
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
          <QuantityRow>
            <QuantityButton onClick={handleDecrease}>—</QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={handleIncrease}>+</QuantityButton>
          </QuantityRow>
        </ProductInfo>
      </ProductRow>
    </Wrapper>
  );
}
