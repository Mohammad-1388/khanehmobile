class ShoppingCart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.cartCountEl = document.getElementById('cart-count');
    this.cartCountEl2 = document.getElementById('cart-count2');
    this.renderCount();
    this.toggleCheckoutButton();
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.renderCount();
    this.toggleCheckoutButton();
  }

  renderCount() {
    if (this.cartCountEl) this.cartCountEl.innerText = this.cart.length;
    if (this.cartCountEl2) this.cartCountEl2.innerText = this.cart.length;
  }

  toggleCheckoutButton() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!checkoutBtn) return;

    checkoutBtn.style.display = this.cart.length === 0 ? 'none' : 'block';
  }

  add(product) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) existing.quantity += product.quantity;
    else this.cart.push(product);
    this.save();
  }

  remove(id) {
    if (confirm("آیا از حذف این کالا اطمینان دارید؟")) {
      this.cart = this.cart.filter(p => p.id !== id);
      this.save();
      this.renderCart();
    }
  }

  renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    this.cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="item-info">
          <strong>${item.name}</strong><br>
          <small>قیمت واحد: ${item.price.toLocaleString()} تومان</small>
        </div>
        <div class="item-actions">
          <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
          <span class="item-total">${itemTotal.toLocaleString()} تومان</span>
          <button class="remove-btn" onclick="cart.remove('${item.id}')">🗑️</button>
        </div>
      `;
      container.appendChild(div);
    });

    if (totalEl)
      totalEl.innerText = total.toLocaleString() + " تومان";

    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.dataset.id;
        const action = e.target.dataset.action;
        const product = this.cart.find(p => p.id === id);
        if (product) {
          product.quantity += action === 'increase' ? 1 : -1;
          if (product.quantity <= 0) this.remove(id);
          this.save();
          this.renderCart();
        }
      });
    });

    if (this.cart.length === 0) {
      container.innerHTML = '<p>سبد خرید خالی است.</p>';
    }

    this.toggleCheckoutButton();
  }

  checkout() {
    if (this.cart.length === 0) return alert("سبد خرید خالی است!");
    if (confirm("آیا از پرداخت اطمینان دارید؟")) {
      alert("پرداخت با موفقیت انجام شد 🎉🙏");
      this.cart = [];
      this.save();
      this.renderCart();
    }
  }
}

const cart = new ShoppingCart();
window.cart = cart;

window.addEventListener('DOMContentLoaded', () => {
  cart.renderCount();
  cart.toggleCheckoutButton();
});
