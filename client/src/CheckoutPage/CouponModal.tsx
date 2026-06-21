import { useEffect, useState } from "react";
import type { CouponItem } from "../types/order";
import { getCouponsApi } from "../api/orderApi";
import { Checkbox } from "../common/Checkbox";
import { Button } from "../common/Button";
import { Spinner } from "../common/Spinner";

interface CouponModalProps {
  orderId: string;
  initialSelectedIds: number[];
  onClose: () => void;
  onApply: (couponIds: number[]) => void;
}

export function CouponModal({
  orderId,
  initialSelectedIds,
  onClose,
  onApply,
}: CouponModalProps) {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelectedIds);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCouponsApi(orderId)
      .then(setCoupons)
      .catch(() => alert("쿠폰 목록을 불러오는 데 실패했습니다."))
      .finally(() => setLoading(false));
  }, [orderId]);

  function handleToggle(couponId: number) {
    setSelectedIds((prev) => {
      if (prev.includes(couponId)) return prev.filter((id) => id !== couponId);
      if (prev.length >= 2) return prev;
      return [...prev, couponId];
    });
  }

  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <span>쿠폰을 선택해 주세요</span>
          <button onClick={onClose}>✕</button>
        </div>
        <p>ⓘ 쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            {coupons.map((coupon) => {
              const isSelected = selectedIds.includes(coupon.id);
              const isDisabled = !coupon.isCouponUsable;
              const isMaxed = selectedIds.length >= 2 && !isSelected;

              return (
                <li key={coupon.id}>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => {
                      if (!isDisabled && !isMaxed) handleToggle(coupon.id);
                    }}
                  />
                  <div>
                    <span>{coupon.title}</span>
                    <p>
                      만료일:{" "}
                      {new Date(coupon.expirationDate).toLocaleDateString(
                        "ko-KR",
                      )}
                    </p>
                    {coupon.minimumAmount && (
                      <p>
                        최소 주문 금액: {coupon.minimumAmount.toLocaleString()}
                        원
                      </p>
                    )}
                    {coupon.availableTime && (
                      <p>
                        사용 가능 시간: {coupon.availableTime.start} ~{" "}
                        {coupon.availableTime.end}
                      </p>
                    )}
                    {isDisabled && <span>사용 불가</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <Button label="쿠폰 사용하기" onClick={() => onApply(selectedIds)} />
      </div>
    </div>
  );
}
