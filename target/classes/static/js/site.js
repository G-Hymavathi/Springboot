function showPage(pageName) {
    const homeView = document.getElementById('home-view');
    const createAccountView = document.getElementById('create-account-view');
    const navHome = document.getElementById('nav-home');
    const navCreate = document.getElementById('nav-create');

    if (pageName === 'home') {
        if (homeView) homeView.style.setProperty('display', 'block', 'important');
        if (createAccountView) createAccountView.style.setProperty('display', 'none', 'important');
        
        if (navHome) navHome.classList.add('active');
        if (navCreate) navCreate.classList.remove('active');
    } 
    else if (pageName === 'create-account') {
        if (homeView) homeView.style.setProperty('display', 'none', 'important');
        if (createAccountView) createAccountView.style.setProperty('display', 'block', 'important');
        if (navCreate) navCreate.classList.add('active');
        if (navHome) navHome.classList.remove('active');
    }
}

async function handleSignup(event) {
    event.preventDefault();

    // Map your frontend input data fields to match Java property names exactly
    const payload = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        accountType: document.getElementById('accountType').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('/api/accounts/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Success! ${data.message} Account ID generated: ${data.id}`);
            document.getElementById('signupForm').reset();
            showPage('home'); // Send user back to home screen dynamically
        } else {
            alert(`Registration Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Network execution failure:', error);
        alert('Could not connect to the BZ Bank backend server.');
    }
}