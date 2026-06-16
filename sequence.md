sequenceDiagram
participant USER
participant FE
participant BE
participant DB

    USER->>FE: 주문 확인 클릭
    FE->>BE: POST /orders

    rect rgb(255, 235, 235)
        Note over USER,DB: ERROR 품절 상품 포함
        BE->>DB: UPDATE products (상품 예약)
        DB-->>BE: update 실패 (수량 0)
        BE-->>FE: 품절 상품 포함 404
        FE-->>USER: 품절 상품 포함 alert
        USER->>FE: 확인 클릭
        FE->>BE: GET /carts
        BE->>DB: SELECT cart
        DB-->>BE: 장바구니 정보 반환
        BE-->>FE: products
        FE-->>USER: 장바구니 화면 (품절된 상품) 업데이트
    end

    rect rgb(235, 255, 235)
        Note over USER,DB: SUCCESS
        BE->>DB: UPDATE products (상품 예약)
        DB-->>BE: update 성공
        BE->>DB: SELECT coupons
        DB-->>BE: 쿠폰 정보 반환
        Note over BE: 가장 할인율이 높은 쿠폰 계산
        BE->>DB: INSERT order (쿠폰 정보 포함)
        DB-->>BE: 주문 번호 생성
        BE-->>FE: orderId
        FE-->>USER: 주문 확인 페이지로 리다이렉트

        FE->>BE: GET /orders/:orderId
        BE->>DB: SELECT order, product
        DB-->>BE: 주문 정보 반환
        Note over BE: 주문 만료 검사

        rect rgb(255, 235, 235)
            Note over USER,DB: ERROR 주문 만료
            BE-->>FE: 404
            FE-->>USER: 장바구니 페이지로 리다이렉트
        end

        BE-->>FE: products, coupons, isRemoteArea, deliveryFee

        FE->>BE: GET /orders/:orderId/discount
        BE->>DB: SELECT order, product, coupon
        DB-->>BE: 주문 정보, 쿠폰 정보 반환
        Note over BE: 할인 금액 계산
        BE-->>FE: discountAmount

        Note over FE: products, deliveryFee, discountAmount 기반으로 총 결제 금액 계산
        FE-->>USER: 주문 확인 화면 렌더링
    end
