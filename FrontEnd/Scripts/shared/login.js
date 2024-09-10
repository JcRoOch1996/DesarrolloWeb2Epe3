// login.js

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Previene el comportamiento predeterminado de enviar el formulario y recargar la página

    // Obtiene los valores de los campos de email, password y userType del formulario
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Define la URL del endpoint de acuerdo al tipo de usuario seleccionado
    let url;
    switch (userType) {
        case 'admin':
            url = 'http://localhost:3000/api/admin/login';
            break;
        case 'career_leader':
            url = 'http://localhost:3000/api/career-heads/login';
            break;
        default:
            alert('Tipo de usuario no válido');
            return;
    }

    // Validación básica de campos
    if (!email || !password) {
        alert('Por favor ingrese tanto el correo electrónico como la contraseña.');
        return;
    }

    try {
        // Envía una solicitud POST a la API de autenticación en el servidor
        const response = await fetch(url, {
            method: 'POST', // Define el método de la solicitud como POST
            headers: {
                'Content-Type': 'application/json' // Especifica que el cuerpo de la solicitud estará en formato JSON
            },
            body: JSON.stringify({ email, password }) // Convierte los datos de email y password a una cadena JSON para enviarlos en el cuerpo de la solicitud
        });

        // Convierte la respuesta de la API a un objeto JSON
        const data = await response.json();
        if (response.ok) { // Si la respuesta es exitosa (status code 200-299)
            // Guarda el RUT en sessionStorage
            sessionStorage.setItem('userRut', data.rut);

            // Redirige a la página correspondiente según el tipo de usuario
            switch (userType) {
                case 'admin':
                    window.location.href = '../Pages/adminPage.html';
                    break;
                case 'career_leader':
                    window.location.href = '../Pages/careerHeadPage.html';
                    break;
            }
        } else { // Si la respuesta no es exitosa (status code 400 o superior)
            alert('Error: ' + data.error); // Muestra un mensaje de error con la información de error proporcionada por la API
        }
    } catch (error) {
        console.error('Error:', error); // Muestra un error en la consola si ocurre un problema de red o una excepción
        alert('Ocurrió un error inesperado. Por favor, inténtelo de nuevo.');
    }
});
