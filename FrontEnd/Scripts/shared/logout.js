// logout.js

document.getElementById('logoutBtn').addEventListener('click', function() {
    // Limpia sessionStorage
    sessionStorage.removeItem('userRut');
    
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '../Pages/login.html';
});
