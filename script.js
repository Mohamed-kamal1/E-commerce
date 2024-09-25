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
  window.location.href = '../Home.html';
    return false;
}
function isLoggedIn() {
  return JSON.parse(localStorage.getItem('loggedInUser')) !== null;
}
// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
  if (!isLoggedIn()){
    let homeLink = document.querySelector('a[href="Home.html"]');
    let homeLink2 = document.querySelectorAll('a[href="../Home.html"]');
    if (homeLink) {
      homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('You must be logged in to access the home page.');
      });
    }
    if (homeLink2) {
      homeLink2.forEach(homeLink => homeLink.addEventListener('click', function(event) {
            event.preventDefault();
            alert('You must be logged in to access the home page.');
          })
      )
    }
    let search = document.querySelector('.nav-right');
    let register = document.querySelector('.register');
    search.style.display = 'none';
    register.classList.add('d-lg-block');


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
/////////////////////////////////////////////////////////////////////////////
if(window.location.href.includes('Home.html')){
  const Cards = document.querySelectorAll('.card');
  let countDownDate = new Date("OCT 10, 2024 00:00:00").getTime();
  Cards.forEach((card) => {
    let addToCart = card.querySelector('.addToCart');
    addToCart.addEventListener('click', () => addProduct(card));
  });
  Timer(countDownDate);
}
/////////////////////////////////////////////////////////////////////////////
if(window.location.href.includes('Cart.html')){
  let products =  JSON.parse(localStorage.getItem('products')) || [];

  updateCheckout();
  products.forEach(product => createProduct(product));
  localStorage.setItem('products', JSON.stringify(products));
  // Clear cart
  document.querySelector('.clear-cart').addEventListener('click', () => {
    localStorage.removeItem('products');
    window.location.reload();
  });
}
/////////////////////////////////////////////////////////////////////////////
if(window.location.href.includes('Billing.html')){
    updateCheckout();
  }



// Timer
function Timer(countDownDate) {
  {
    let Timer = document.querySelector('.timer');
    let x = setInterval(function () {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2);
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2);
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2);
      let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2);
      if (distance < 0) {
        clearInterval(x);
      } else {
        Timer.innerHTML = `
            <div class="block">
                <span>Days</span>
                <span>${days}</span>
            </div>
            <span>:</span>
            <div class="block">
                <span>Hours</span>
                <span>${hours}</span>
            </div>
            <span>:</span>
            <div class="block">
                <span>Minutes</span>
                <span>${minutes}</span>
            </div>
            <span>:</span>
            <div class="block">
                <span>Seconds</span>
                <span>${seconds}</span>
            </div>
            `;
      }
    }, 1000);


  }
}
// Add product
function addProduct(card) {
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
    updateCartNumber();
  }
// create product
function createProduct(product){
  {
    let cart = document.querySelector('.cart-items');
    let item = document.createElement('div');
    item.classList.add('card');
    item.innerHTML = `
          <div class="card-image">
            <img src="${product.image}" alt="">
            <div class="delete">
            <img src="../assets/close.png" alt="">
            </div>
          </div>
          <h1 class="price">$${product.price}</h1>
          <div class="quantity">
            <input type="number" value="${product.quantity}" min="1">
          </div>
          <h1 class="total-price">$${product.quantity*product.price}</h1>
  `;
    cart.appendChild(item);
    let quantity = item.querySelector('.quantity').querySelector('input');
    quantity.addEventListener('change', () => {
      updateQuantity(product.id,quantity.value);
      item.querySelector('.total-price').innerHTML = `$${quantity.value*product.price}`;
      updateCheckout();

    });
    item.querySelector('.delete').addEventListener('click', () =>
    {
      deleteProduct(product)
        item.remove();
    });
  }
}
// Update cart number
function updateCartNumber(){
  let products =  JSON.parse(localStorage.getItem('products')) || [];
  let cartNumber = document.querySelector('.cart-number');
  if(cartNumber){
    cartNumber.innerHTML = products.length.toString();
    products.length === 0 ? cartNumber.style.display = 'none' : cartNumber.style.display = 'flex';
  }
}
// Update checkout
function updateCheckout(){
  let products =  JSON.parse(localStorage.getItem('products')) || [];
  let checkout = document.querySelector('.checkout');
  let total = products.reduce((acc, product) => acc + product.price*product.quantity, 0);
  checkout.querySelector('.subtotal').querySelectorAll('h1')[1].innerHTML = `$${total}`;
  checkout.querySelector('.tax').querySelectorAll('h1')[1].innerHTML = `$${Math.ceil(total*0.14)}`;
  checkout.querySelector('.total').querySelectorAll('h1')[1].innerHTML = `$${total + Math.ceil(total*0.14)}`;
}
// Update quantity
function updateQuantity(id , value){
    let products =  JSON.parse(localStorage.getItem('products')) || [];
    let product = products.find(product => product.id === id);
    product.quantity = value;
    localStorage.setItem('products', JSON.stringify(products));
}
// delete product
function deleteProduct(product){
  let products =  JSON.parse(localStorage.getItem('products')) || [];
  products.splice(products.indexOf(product), 1);
  localStorage.setItem('products', JSON.stringify(products));
  updateCartNumber();
  updateCheckout();
}

// Update billing
function bank(){
  let credit = document.getElementById('creditCard');
  if(credit.checked){
    document.querySelector('.cardNumber').style.display = 'block';
    document.querySelector('.expiryDate').style.display = 'block';
    document.querySelector('.cvv').style.display = 'block';
  }
    else {
        document.querySelector('.cardNumber').style.display = 'none';
        document.querySelector('.expiryDate').style.display = 'none';
        document.querySelector('.cvv').style.display = 'none';
    }
}