function openUserMenu() {
  document.querySelector('.user-menu').classList.toggle('open');

}

function createAccount() {
  let form = document.getElementById('signup-form');
  form.addEventListener('submit', (event) => {
    // Handle form data validation
    event.preventDefault(); // Stop form submission if needed
  });
}

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
  console.log(users);
  document.querySelector('.signup_message').style.display = 'flex';
  return false
}
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
  window.location.href = 'index.html';
    return false;

}



(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

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