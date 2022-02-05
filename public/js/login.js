//login
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#exampleLoginEmail1').value.trim();
  const password = document.querySelector('#exampleLoginPassword1').value.trim();
console.log({email, password});
  if (email && password) {
    const response = await fetch('/api/players/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/chat/chatfinder');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
