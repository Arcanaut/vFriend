//sign up
async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#exampleSignupUsername1').value.trim();
    const email = document.querySelector('#exampleSignupEmail1').value.trim();
    const password = document.querySelector('#exampleSignupPassword1').value.trim();
  console.log({username, email, password});
    if (username && email && password) {
      const response = await fetch('/api/players', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // var signupFunction = () => {
  
  // } 
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)