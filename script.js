if(window.location.href.includes('Home.html') || window.location.href.includes('Cart.html') )
  updateCartNumber();


function openUserMenu() {
  document.querySelector('.user-menu').classList.toggle('open');
}
// Validate email
function validateEmail() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const name = document.forms["signup-form"]["Name1"].value;
  const email = document.forms["signup-form"]["Email1"].value;
  const password = document.forms["signup-form"]["Password1"].value;
  if(email === '' || password === '' || name === '' || !email.includes('@')) {
    return false;
  }
  const newUser = { name:name, email:email, password:password };
  if(users.find(user => user.email === email)){
    alert('Email already exists');
    return false;
  }
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  document.querySelector('.signup_message').style.display = 'flex';
  return false
}
// Validate login
function validateLogin() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const email = document.forms["login-form"]["Email2"].value;
  const password = document.forms["login-form"]["Password2"].value;
  if(email === '' || password === '' || !email.includes('@')) {
    return false;
  }
  const user = users.find(user => user.email === email && user.password === password);
  if(!user){
    alert('Invalid email or password');
    return false;
  }
  localStorage.setItem('loggedInUser', JSON.stringify(user));
  window.location.href = 'Home.html';
    return false;
}
function isLoggedIn() {
  return JSON.parse(localStorage.getItem('loggedInUser')) !== null;
}
// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
  const homeLink = document.querySelector('a[href="Home.html"]');
  if (homeLink) {
    homeLink.addEventListener('click', function(event) {
      if (!isLoggedIn()) {
        event.preventDefault();
        alert('You must be logged in to access the home page.');
      }
    });
  }
});

// logout
function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('products');
    window.location.href = 'index.html';
}
// Validate forms
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
})()
// Scroll cards
function scrollCards(direction ,section_number) {
  let section, card, value ;
  switch (section_number) {
    case 2:
      card = '.card';
      section = 'today\'s';
      break;
    case 3:
      card ='.category';
      section = 'categories' ;
      break;
    case 4:
        card ='.card';
        section = 'bestSellers';
        break;

  }
  value = document.querySelector(card).offsetWidth + 40 ;
  value =  direction === 'left' ? value*-1: value;
  document.getElementById(section).scrollBy({
    left: value, // Adjust this value based on card width
    behavior: 'smooth'
  });
}
/////////////////////////////////////////////////////////////////////////////
const Cards = document.querySelectorAll('.card');
Cards.forEach((card) => {
  if(window.location.href.includes('Home.html')){
    let addToCart = card.querySelector('.addToCart');
    addToCart.addEventListener('click', () => {
      const products =  JSON.parse(localStorage.getItem('products')) || [];
      let exist = products.find(product => product.id === parseInt(card.querySelector('.id').innerHTML));
      if(exist){
        exist.quantity += 1;
      }
      else {
        products.push(
            {
              id:parseInt( card.querySelector('.id').innerHTML),
              image: card.querySelector('.card-image').querySelector('img').src,
              title: card.querySelector('.card-content').querySelector('h1').innerHTML,
              price: card.querySelector('.price').innerHTML.split('<')[0].slice(1),
              quantity: 1,
            }
        );
      }
      localStorage.setItem('products', JSON.stringify(products));
    });
  }
});
/////////////////////////////////////////////////////////////////////////////
let cart = document.querySelector('.cart-items');
const products =  JSON.parse(localStorage.getItem('products')) || [];
if(window.location.href.includes('Cart.html')){
  updateCheckout();
  products.forEach(product => {
    let item = document.createElement('div');
    item.classList.add('card');
    item.innerHTML = `
          <div class="card-image">
            <img src="${product.image}" alt="">
            <div class="delete">
            <img src="assets/close.png" alt="">
            </div>
          </div>
          <h1 class="price">$${product.price}</h1>
          <div class="quantity">
            <input type="number" value="${product.quantity}" min="1">
          </div>
          <h1 class="total-price">$${product.quantity*product.price}</h1>
  `;
    cart.appendChild(item);
    item.querySelector('.quantity').querySelector('input').addEventListener('change', () => {
      product.quantity = item.querySelector('.quantity').querySelector('input').value;
      item.querySelector('.total-price').innerHTML = `$${product.quantity*product.price}`;
      localStorage.setItem('products', JSON.stringify(products));
        updateCheckout();

    });
    item.querySelector('.delete').addEventListener('click', () => {
      products.splice(products.indexOf(product), 1);
      localStorage.setItem('products', JSON.stringify(products));
      item.remove();
      updateCheckout();
      updateCartNumber();

    });
  });
  // Update checkout
  function updateCheckout(){
    let checkout = document.querySelector('.checkout');
    let total = products.reduce((acc, product) => acc + product.price*product.quantity, 0);
    checkout.querySelector('.subtotal').querySelectorAll('h1')[1].innerHTML = `$${total}`;
    checkout.querySelector('.tax').querySelectorAll('h1')[1].innerHTML = `$${Math.ceil(total*0.14)}`;
    checkout.querySelector('.total').querySelectorAll('h1')[1].innerHTML = `$${total + Math.ceil(total*0.14)}`;
  }
  // Clear cart
  document.querySelector('.clear-cart').addEventListener('click', () => {
    localStorage.removeItem('products');
    window.location.reload();
  });
}
/////////////////////////////////////////////////////////////////////////////
if(window.location.href.includes('Home.html')){
  let Timer = document.querySelector('.timer');
  let countDownDate = new Date("OCT 10, 2024 00:00:00").getTime();
    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2,0);
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2,0);
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2,0);
        let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2,0);
        if (distance < 0) {
        clearInterval(x);
        }
        else {
            Timer.innerHTML = `
            <div>
                <span>Days</span>
                <span>${days}</span>
            </div>
            <span>:</span>
            <div>
                <span>Hours</span>
                <span>${hours}</span>
            </div>
            <span>:</span>
            <div>
                <span>Minutes</span>
                <span>${minutes}</span>
            </div>
            <span>:</span>
            <div>
                <span>Seconds</span>
                <span>${seconds}</span>
            </div>
            `;
        }
    }, 1000);


}
// Update cart number
function updateCartNumber(){
  let products =  JSON.parse(localStorage.getItem('products')) || [];
  document.querySelector('.cart-number').innerHTML = products.length;
  products.length === 0 ? document.querySelector('.cart-number').style.display = 'none' : document.querySelector('.cart-number').style.display = 'flex';
}

