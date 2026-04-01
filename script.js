// ELEVATED COFFEE — Website JS

// ─── CART ───────────────────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('elevated_cart') || '[]');

const cartBtn     = document.getElementById('cartBtn');
const cartDrawer  = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose   = document.getElementById('cartClose');
const cartItems   = document.getElementById('cartItems');
const cartFooter  = document.getElementById('cartFooter');
const cartBadge   = document.getElementById('cartBadge');
const cartTotal   = document.getElementById('cartTotal');

function saveCart() {
  localStorage.setItem('elevated_cart', JSON.stringify(cart));
}

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  // Badge
  if (count > 0) {
    cartBadge.textContent = count;
    cartBadge.style.display = 'flex';
  } else {
    cartBadge.style.display = 'none';
  }

  // Total
  cartTotal.textContent = `$${total.toFixed(2)}`;
  cartFooter.style.display = count > 0 ? 'flex' : 'none';

  // Items
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((item, idx) => `
    <div class="cart-item" data-idx="${idx}">
      <img class="cart-item__img" src="${item.img}" alt="${item.name}" />
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">$${item.price.toFixed(2)} each</div>
        <div class="cart-item__controls">
          <button class="qty-down" data-idx="${idx}">-</button>
          <span class="cart-item__qty">${item.qty}</span>
          <button class="qty-up" data-idx="${idx}">+</button>
        </div>
      </div>
      <button class="cart-item__remove" data-idx="${idx}" aria-label="Remove">&times;</button>
    </div>
  `).join('');

  // Qty controls
  cartItems.querySelectorAll('.qty-up').forEach(btn => {
    btn.addEventListener('click', () => {
      cart[btn.dataset.idx].qty++;
      saveCart(); renderCart();
    });
  });
  cartItems.querySelectorAll('.qty-down').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.idx;
      cart[i].qty--;
      if (cart[i].qty <= 0) cart.splice(i, 1);
      saveCart(); renderCart();
    });
  });
  cartItems.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(btn.dataset.idx, 1);
      saveCart(); renderCart();
    });
  });
}

// Add to cart buttons
document.querySelectorAll('.btn--add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name  = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const img   = btn.dataset.img;
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, img, qty: 1 });
    }
    saveCart();
    renderCart();
    // Flash button
    btn.textContent = 'Added';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }, 1200);
    openCart();
  });
});

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Checkout placeholder
document.querySelector('.cart-checkout')?.addEventListener('click', () => {
  alert('Checkout coming soon! Stay elevated.');
});

// Init
renderCart();



// ─── Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.ingredient, .stat, .product-card, .about__text, .about__stats').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ─── Nav scroll effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.borderBottomColor = 'rgba(247, 240, 237, 0.12)';
  } else {
    nav.style.borderBottomColor = 'rgba(247, 240, 237, 0.08)';
  }
});

// ─── Mobile nav
const hamburger = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  if (isOpen) {
    navLinks.style.display = 'none';
    hamburger.classList.remove('open');
  } else {
    const navH = nav.offsetHeight;
    navLinks.style.cssText = `
      display: flex;
      flex-direction: column;
      position: absolute;
      top: ${navH}px;
      left: 0;
      right: 0;
      background: rgba(35, 15, 7, 0.98);
      padding: 24px 24px;
      gap: 20px;
      border-bottom: 1px solid rgba(247,240,237,0.08);
      z-index: 99;
    `;
    hamburger.classList.add('open');
  }
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      navLinks.style.display = 'none';
      hamburger?.classList.remove('open');
    }
  });
});

// ─── Email form
document.querySelector('.cta__form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  btn.textContent = 'You\'re on the list ✓';
  btn.style.background = '#4B3228';
  btn.style.color = 'var(--cream)';
  input.value = '';
  input.placeholder = 'Talk soon.';
  input.disabled = true;
});
