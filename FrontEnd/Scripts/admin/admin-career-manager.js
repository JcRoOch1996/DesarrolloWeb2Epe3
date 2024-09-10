// Se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', async function() {
    const CareerList = document.getElementById('taskList'); // Obtiene la referencia a la lista de tareas en el DOM

    // Carga las tareas al inicio
    await loadTasks();

    // Maneja el evento de clic en el botón "Añadir Tarea"
    document.getElementById('addTaskBtn').addEventListener('click', function() {
        document.getElementById('taskModalLabel').innerText = 'Añadir Carrera';
        document.getElementById('CareerForm').reset();
        document.getElementById('id').value = '';
        $('#taskModal').modal('show');
    });

    // Maneja el evento de envío del formulario de carreras
    document.getElementById('CareerForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado de recargar la página

        // Obtiene los valores del formulario
        const id = document.getElementById('id').value;
        const career_code = document.getElementById('career_code').value;
        const career_name = document.getElementById('career_name').value;

        try {
            let response;
            if (id) {
                // Si hay un ID, actualizar la carrera existente (método PUT)
                response = await fetch(`http://localhost:3000/api/careers/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ career_code, career_name }) // Envía los datos en formato JSON
                });
            } else {
                // Si no hay ID, crear una nueva carrera (método POST)
                response = await fetch('http://localhost:3000/api/careers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ career_code, career_name }) 
                });
            }

            if (response.ok) {
                $('#taskModal').modal('hide'); // Oculta el modal si la operación fue exitosa
                await loadTasks(); // Recarga la lista de carreras
            } else {
                const data = await response.json();
                alert('Error al guardar la carrera: ' + data.error); // Muestra un mensaje de error si algo salió mal
            }
        } catch (error) {
            console.error('Error al intentar guardar la carrera:', error); // Loguea el error en la consola
            alert('Ocurrió un error al intentar guardar la carrera.'); // Muestra un mensaje de error al usuario
        }
    });

    // Función para cargar las carreras desde la API
    async function loadTasks() {
        try {
            const response = await fetch('http://localhost:3000/api/careers', {
            });

            if (response.ok) {
                const careers = await response.json(); // Convierte la respuesta en un array de carreras

                CareerList.innerHTML = ''; // Limpia la lista de carreras existente
                careers.forEach(career => {
                    const row = document.createElement('tr'); // Crea una nueva fila para cada carrera

                    // Define el contenido HTML de la fila, incluyendo botones para editar y eliminar
                    row.innerHTML = `
                        <td>${career.id}</td>
                        <td>${career.career_code}</td>
                        <td>${career.career_name}</td>
                        <td>
                            <button class="btn btn-sm btn-primary editTaskBtn">Editar</button>
                            <button class="btn btn-sm btn-danger deleteTaskBtn">Eliminar</button>
                        </td>
                    `;

                    // Añade manejadores de eventos a los botones de editar y eliminar
                    row.querySelector('.editTaskBtn').addEventListener('click', () => editTask(career));
                    row.querySelector('.deleteTaskBtn').addEventListener('click', () => deleteTask(career.id));

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

    // Función para editar una carrera
    function editTask(career) {
        document.getElementById('taskModalLabel').innerText = 'Editar Carrera'; // Cambia el título del modal
        document.getElementById('career_code').value = career.career_code; // Rellena el formulario con los datos de la carrera
        document.getElementById('career_name').value = career.career_name;
        document.getElementById('id').value = career.id; // Establece el ID de la carrera en el campo oculto

        $('#taskModal').modal('show'); // Muestra el modal para editar la carrera
    }

    // Función para eliminar una carrera
    async function deleteTask(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/careers/${id}`, {
                method: 'DELETE' // Método DELETE para eliminar la carrera
            });

            if (response.ok) {
                await loadTasks(); // Recarga la lista de carreras después de eliminar
            } else {
                alert('Error al eliminar la carrera'); // Muestra un mensaje de error si algo salió mal
            }
        } catch (error) {
            console.error('Error al intentar eliminar la carrera:', error); // Loguea el error en la consola
            alert('Ocurrió un error al intentar eliminar la carrera.'); // Muestra un mensaje de error al usuario
        }
    }
});
