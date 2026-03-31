export const animateFlyingToCart = (
  e: React.MouseEvent<HTMLButtonElement>,
  imageSrc: string
) => {
  // Найти элемент корзины (по id=cart-icon-nav)
  const cartIcon = document.getElementById("cart-icon-nav");

  // Если это клик по кнопке, пытаемся найти картинку внутри карточки товара
  const cardElement = (e.currentTarget as HTMLElement).closest('[data-product-card]');
  if (!cardElement) return;

  const imgElement = cardElement.querySelector('img');
  if (!imgElement) return;

  const startRect = imgElement.getBoundingClientRect();
  const endRect = cartIcon ? cartIcon.getBoundingClientRect() : null;

  // Создаем клон картинки
  const flyingImg = document.createElement("img");
  flyingImg.src = imageSrc;
  flyingImg.style.position = "fixed";
  flyingImg.style.left = startRect.left + "px";
  flyingImg.style.top = startRect.top + "px";
  flyingImg.style.width = startRect.width + "px";
  flyingImg.style.height = startRect.height + "px";
  flyingImg.style.objectFit = "cover";
  flyingImg.style.borderRadius = "50%";
  flyingImg.style.zIndex = "9999";
  flyingImg.style.pointerEvents = "none";
  flyingImg.style.transition = "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
  
  document.body.appendChild(flyingImg);

  // Даем браузеру отрисовать кадр перед стартом анимации
  requestAnimationFrame(() => {
    // Рассчитываем центры, если нет корзины, летим в центр-низ
    const endX = endRect ? endRect.left + endRect.width / 2 : window.innerWidth / 2;
    const endY = endRect ? endRect.top + endRect.height / 2 : window.innerHeight - 50;
    
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    
    flyingImg.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.1)`;
    flyingImg.style.opacity = "0.2";
  });

  // Удаляем после завершения
  setTimeout(() => {
    if (document.body.contains(flyingImg)) {
      document.body.removeChild(flyingImg);
    }
  }, 600);
};
