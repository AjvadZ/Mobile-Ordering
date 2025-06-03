import { menuArray } from "./data.js";

const paymentSummary = document.getElementById('payment-summary');
const orderSummaryEl = document.getElementById('order-summary');
const mainBody = document.getElementById('app');
const menuEl = document.getElementById('menu');

let orderSummary = [];

function renderMenu() {
    menuEl.innerHTML = '';
    menuArray.forEach(({ name, ingredients, price, emoji, id }) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'menu-item';
        itemEl.innerHTML = `
            <p class="menu-item-emoji">${emoji}</p>
            <div class="menu-item-details">
                <h3>${name}</h3>
                <p>${ingredients.join(', ')}</p>
                <p class="menu-item-price">$${price}</p>
            </div>
            <button class="menu-item-add-btn" data-add="${id}">+</button>
            <hr class="menu-item-divider">
        `;
        menuEl.appendChild(itemEl);
    });
}

function renderOrderSummary() {
    orderSummaryEl.innerHTML = '<h3 class="order-title">Your Order</h3>';
    orderSummary.forEach(({ name, price, id }) => {
        const section = document.createElement('div');
        section.className = 'order-summary-section';
        section.innerHTML = `
            <div class="order-item-row">
                <p>${name} <button class="order-remove-btn" data-remove="${id}">remove</button></p>
                <p>$${price}</p>
            </div>
        `;
        orderSummaryEl.appendChild(section);
    });
}

function renderPaymentSummary() {
    const totalPrice = orderSummary.reduce((sum, item) => sum + item.price, 0);

    paymentSummary.innerHTML = `
        <div class="order-confirm-section">
            <hr>
            <div class="order-total-row">
                <p>Total: </p>
                <p>$${totalPrice}</p>
            </div>
            <button class="order-complete-btn">Complete Order</button>
        </div>
    `;

    document.querySelector('.order-complete-btn').addEventListener('click', showPaymentForm);
}

function showPaymentForm() {
    const form = document.createElement('form');
    form.id = 'payment-form';
    form.innerHTML = `
        <h3 class='payment-form-heading'>Enter card details</h3>
        <input id='name' type='text' pattern="[A-Za-z\\s]{3,}" minlength="2" maxlength="20" name='userName' placeholder='Enter your name' required />
        <input id='card-num' type='text' pattern="\\d{16}" maxlength="16" minlength="16" inputmode="numeric" name='cardNum' placeholder='Enter your card number' required />
        <input id='cvv' type='password' name='cvv' placeholder='Enter your CVV' required pattern="\\d{3}" inputmode="numeric" minlength="3" maxlength="3" />
        <button type='submit'>Pay</button>
    `;

    mainBody.appendChild(form);

    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get('userName');
        form.remove();

        paymentSummary.textContent = '';
        orderSummaryEl.innerHTML = `
            <div class='order-placed-msg'><p>Thanks, ${name}! Your order is on its way!</p></div>
        `;
    });
}

menuEl.addEventListener('click', (e) => {
    const addId = e.target.dataset.add;
    if (addId) {
        const item = menuArray.find(el => el.id === Number(addId));
        const existing = orderSummary.find(el => el.id === item.id);

        if (existing) {
            existing.quantity++;
            existing.price = item.price * existing.quantity;
        } else {
            orderSummary.push({ ...item, quantity: 1 });
        }

        renderOrderSummary();
        renderPaymentSummary();
    }
});

orderSummaryEl.addEventListener('click', (e) => {
    const removeId = e.target.dataset.remove;
    if (removeId) {
        orderSummary = orderSummary.filter(item => item.id !== Number(removeId));
        renderOrderSummary();
        renderPaymentSummary();
    }
});

renderMenu();
