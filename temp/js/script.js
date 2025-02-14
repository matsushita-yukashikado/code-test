//smooth scroll
const smoothScrollTrigger = document.querySelectorAll('.js-smoothScroll');
for (let i = 0; i < smoothScrollTrigger.length; i++) {
  smoothScrollTrigger[i].addEventListener('click', (e) => {
    e.preventDefault();
    let href = smoothScrollTrigger[i].getAttribute('href');
    let targetElement = document.getElementById(href.replace('#', ''));
    const rect = targetElement.getBoundingClientRect().top;
    const offset = window.pageYOffset;
    const gap = 0;
    const target = rect + offset - gap;
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });
  });
}

//accordion
const menu = document.querySelectorAll(".js-accordion dt");
function toggle() {
  const content = this.nextElementSibling;
  this.classList.toggle("-active");
  content.classList.toggle("-open");
}
for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", toggle);
}

//floating-button
// スクロールイベントのスロットリング用変数
let isThrottled = false;
// スクロール時の処理
window.addEventListener('scroll', () => {
  if (!isThrottled) {
    isThrottled = true;
    setTimeout(() => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const show = scrollPosition > 80; //80pxほどスクロールしたら表示
      toggleFloatingButton(show);
      isThrottled = false;
    }, 100); // スロットリングの間隔（100ミリ秒）
  }
});
//フローティングボタンの表示 / 非表示を切り替える関数
function toggleFloatingButton(show) {
  const floatingButton = document.getElementById("js-cvFixed");
  if (show) {
    floatingButton.classList.add("-floating");
  } else {
    floatingButton.classList.remove("-floating");
  }
}

// LPのURLにあるクエリパラメータをform/paginationにも引き継ぐようにする
document.addEventListener("DOMContentLoaded", function () {
	const pageQueryParams = new URLSearchParams(window.location.search);
	const formLinks = document.querySelectorAll('a[href*="form/pagination"]');
	formLinks.forEach(link => {
		const originalUrl = new URL(link.href);
		pageQueryParams.forEach((value, key) => {
			originalUrl.searchParams.set(key, value);
		});
		link.href = originalUrl.toString();
	});
});