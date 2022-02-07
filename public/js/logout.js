async function logout() {
    const response = await fetch('/api/players/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert("you're already logged out");
    }
}

document.querySelector('#logout').addEventListener('click', logout);