console.log('hello')

const registerFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  console.log(name, email, password)
  //if there is username, email, and password, fetches info and posts to database
  if (name && email && password) {
    const response = await fetch('/api/', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    //if the posted info is correct, direct to login, otherwise render error
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Invalid Login');
      document.location.replace('/login');
    }
  }
};

document
  .querySelector('#register-form')
  .addEventListener('submit', registerFormHandler);