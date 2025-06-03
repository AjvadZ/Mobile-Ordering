(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&n(m)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const c=[{name:"Pizza",ingredients:["pepperoni","mushrom","mozarella"],price:14,emoji:"🍕",quantity:0,id:0},{name:"Hamburger",ingredients:["beef","cheese","lettuce"],price:12,emoji:"🍔",quantity:0,id:1},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"🍺",quantity:0,id:2}],u=document.getElementById("payment-summary"),d=document.getElementById("order-summary"),y=document.getElementById("app"),s=document.getElementById("menu");let a=[];function f(){s.innerHTML="",c.forEach(({name:t,ingredients:r,price:o,emoji:n,id:e})=>{const i=document.createElement("div");i.className="menu-item",i.innerHTML=`
            <p class="menu-item-emoji">${n}</p>
            <div class="menu-item-details">
                <h3>${t}</h3>
                <p>${r.join(", ")}</p>
                <p class="menu-item-price">$${o}</p>
            </div>
            <button class="menu-item-add-btn" data-add="${e}">+</button>
            <hr class="menu-item-divider">
        `,s.appendChild(i)})}function l(){d.innerHTML='<h3 class="order-title">Your Order</h3>',a.forEach(({name:t,price:r,id:o})=>{const n=document.createElement("div");n.className="order-summary-section",n.innerHTML=`
            <div class="order-item-row">
                <p>${t} <button class="order-remove-btn" data-remove="${o}">remove</button></p>
                <p>$${r}</p>
            </div>
        `,d.appendChild(n)})}function p(){const t=a.reduce((r,o)=>r+o.price,0);u.innerHTML=`
        <div class="order-confirm-section">
            <hr>
            <div class="order-total-row">
                <p>Total: </p>
                <p>$${t}</p>
            </div>
            <button class="order-complete-btn">Complete Order</button>
        </div>
    `,document.querySelector(".order-complete-btn").addEventListener("click",h)}function h(){const t=document.createElement("form");t.id="payment-form",t.innerHTML=`
        <h3 class='payment-form-heading'>Enter card details</h3>
        <input id='name' type='text' pattern="[A-Za-z\\s]{3,}" minlength="2" maxlength="20" name='userName' placeholder='Enter your name' required />
        <input id='card-num' type='text' pattern="\\d{16}" maxlength="16" minlength="16" inputmode="numeric" name='cardNum' placeholder='Enter your card number' required />
        <input id='cvv' type='password' name='cvv' placeholder='Enter your CVV' required pattern="\\d{3}" inputmode="numeric" minlength="3" maxlength="3" />
        <button type='submit'>Pay</button>
    `,y.appendChild(t),t.addEventListener("submit",r=>{r.preventDefault();const n=new FormData(t).get("userName");t.remove(),u.textContent="",d.innerHTML=`
            <div class='order-placed-msg'><p>Thanks, ${n}! Your order is on its way!</p></div>
        `})}s.addEventListener("click",t=>{const r=t.target.dataset.add;if(r){const o=c.find(e=>e.id===Number(r)),n=a.find(e=>e.id===o.id);n?(n.quantity++,n.price=o.price*n.quantity):a.push({...o,quantity:1}),l(),p()}});d.addEventListener("click",t=>{const r=t.target.dataset.remove;r&&(a=a.filter(o=>o.id!==Number(r)),l(),p())});f();
