const registerFormHandler = async (event) => {
  event.preventDefault();


  const name = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();


  //if there is username, email, and password, fetches info and posts to database
  if (name && email && password) {
    console.log('hello')

    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('response', response)
    //if the posted info is correct, direct to login, otherwise render error
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Invalid input line 20');
    }
  } else {
    alert('Invalid input line 23')
  }
};

document
  .querySelector('#register-form')
  .addEventListener('submit', registerFormHandler);