// Se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', async function() {
    const CareerList = document.getElementById('CareerList'); // Obtiene la referencia a la lista de carreras en el DOM

    // Obtiene el RUT del almacenamiento de sesión
    const rut = sessionStorage.getItem('userRut');

    // Verifica que el RUT no sea null o undefined
    if (!rut) {
        alert('No se encontró el RUT del usuario en el almacenamiento de sesión.');
        return;
    }

    // Carga las carreras al inicio
    await loadCareers(rut);

    // Función para cargar las carreras desde la API
    async function loadCareers(rut) {
        try {
            // Asegúrate de usar una URL completa con el protocolo (http o https)
            const response = await fetch(`http://localhost:3000/api/careerhead/career/${rut}`, {
                method: 'GET', // Define el método de la solicitud como GET
                headers: {
                    'Content-Type': 'application/json' // Especifica que se espera una respuesta en formato JSON
                }
            });

            if (response.ok) {
                const careers = await response.json(); // Convierte la respuesta en un array de carreras

                CareerList.innerHTML = ''; // Limpia la lista de carreras existente
                careers.forEach(career => {
                    const row = document.createElement('tr'); // Crea una nueva fila para cada carrera

                    // Define el contenido HTML de la fila, incluyendo botones para editar y eliminar
                    row.innerHTML = `
                        <td>${career.careerId}</td>
                        <td>${career.careerCode}</td>
                        <td>${career.careerName}</td>
                    `;
                    CareerList.appendChild(row); // Añade la fila a la lista de carreras en el DOM
                });
            } else {
                alert('Error al cargar las carreras'); // Muestra un mensaje de error si algo salió mal al cargar las carreras
            }
        } catch (error) {
            console.error('Error al cargar las carreras:', error); // Loguea el error en la consola
            alert('Ocurrió un error al cargar las carreras.'); // Muestra un mensaje de error al usuario
        }
    }
});
