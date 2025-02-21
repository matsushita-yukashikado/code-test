// const slider = document.querySelector('#js-slider');

let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let velocity = 0; // スワイプ速度
let animationFrameId;

slider.addEventListener('pointerdown', (e) => {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
  velocity = 0;
  cancelAnimationFrame(animationFrameId); // アニメーションをリセット
  slider.style.cursor = 'grabbing';
});

slider.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX;
  const delta = x - startX;
  slider.scrollLeft = scrollLeft - delta;
  velocity = delta; // スワイプ速度を記録
});

slider.addEventListener('pointerup', () => {
  isDragging = false;
  slider.style.cursor = 'grab';
  startInertia(); // 慣性を開始
});

slider.addEventListener('pointerleave', () => {
  isDragging = false;
  slider.style.cursor = 'grab';
});

function startInertia() {
  if (Math.abs(velocity) < 0.5) return; // 速度が小さくなったら停止
  slider.scrollLeft -= velocity; // 慣性スクロール
  velocity *= 0.95; // 摩擦を加えて減速
  animationFrameId = requestAnimationFrame(startInertia);
}