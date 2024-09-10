document.addEventListener('DOMContentLoaded', async function() {
    const jefeCarreraList = document.getElementById('jefeList'); // Tabla de jefes de carrera

    // Carga los jefes de carrera al inicio
    await loadJefesCarrera();

    // Maneja el evento de clic en el botón "Añadir Jefe de Carrera"
    document.getElementById('addJefeBtn').addEventListener('click', function() {
        document.getElementById('jefeModalLabel').innerText = 'Añadir Jefe de Carrera';
        document.getElementById('JefeForm').reset();
        $('#jefeModal').modal('show');
    });

    // Maneja el evento de envío del formulario de jefes de carrera
    document.getElementById('JefeForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Obtener valores del formulario
        const rut = document.getElementById('jefe_rut').value;
        const names = document.getElementById('jefe_nombres').value;
        const lastnames = document.getElementById('jefe_apellidos').value;
        const birthdate = document.getElementById('jefe_fecha_nacimiento').value;
        const gender = document.getElementById('jefe_genero').value;
        const email = document.getElementById('jefe_email').value;
        const password = document.getElementById('jefe_contrasena').value;
        const role = document.getElementById('jefe_rol').value;
        const careerId = document.getElementById('jefe_carrera_id').value;

        try {
            let response = await fetch(`http://localhost:3000/api/career-heads/${rut}`, {
                method: 'PUT', // Si el jefe ya existe, actualiza
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rut, names, lastnames, birthdate, gender, email, password, role, careerId })
            });

            if (response.status === 404) {
                // Si el rut no existe, crea un nuevo jefe
                response = await fetch('http://localhost:3000/api/career-heads/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rut, names, lastnames, birthdate, gender, email, password, role, careerId })
                });
            }

            if (response.ok) {
                $('#jefeModal').modal('hide'); // Oculta el modal si la operación es exitosa
                await loadJefesCarrera(); // Recarga la lista de jefes
            } else {
                const data = await response.json();
                alert('Error al guardar el jefe de carrera: ' + data.error);
            }
        } catch (error) {
            console.error('Error al intentar guardar el jefe de carrera:', error);
            alert('Ocurrió un error al intentar guardar el jefe de carrera.');
        }
    });

    // Función para cargar los jefes de carrera desde la API
    async function loadJefesCarrera() {
        try {
            const response = await fetch('http://localhost:3000/api/career-heads/');
            if (response.ok) {
                const jefes = await response.json(); // Convertir la respuesta en un array de jefes

                jefeCarreraList.innerHTML = ''; // Limpiar la lista de jefes existente
                jefes.forEach(jefe => {
                    const row = document.createElement('tr'); // Crear una fila por cada jefe

                    // Contenido HTML de cada fila
                    row.innerHTML = `
                        <td>${jefe.rut}</td>
                        <td>${jefe.names}</td>
                        <td>${jefe.lastnames}</td>
                        <td>${jefe.birthdate}</td>
                        <td>${jefe.gender}</td>
                        <td>${jefe.email}</td>
                        <td>${jefe.password}</td>
                        <td>${jefe.role}</td>
                        <td>${jefe.careerId}</td>
                        <td>
                            <button class="btn btn-sm btn-primary editTaskBtn">Editar</button>
                            <button class="btn btn-sm btn-danger deleteTaskBtn">Eliminar</button>
                        </td>
                    `;

                    // Eventos de los botones de editar y eliminar
                    row.querySelector('.editTaskBtn').addEventListener('click', () => editJefe(jefe));
                    row.querySelector('.deleteTaskBtn').addEventListener('click', () => deleteJefe(jefe.rut));

                    jefeCarreraList.appendChild(row); // Añadir la fila a la tabla
                });
            } else {
                alert('Error al cargar los jefes de carrera');
            }
        } catch (error) {
            console.error('Error al cargar los jefes de carrera:', error);
            alert('Ocurrió un error al cargar los jefes de carrera.');
        }
    }

    // Función para editar un jefe de carrera
    function editJefe(jefe) {
        document.getElementById('jefeModalLabel').innerText = 'Editar Jefe de Carrera';
        document.getElementById('jefe_rut').value = jefe.rut; // Rellenar el formulario con los datos del jefe
        document.getElementById('jefe_nombres').value = jefe.names;
        document.getElementById('jefe_apellidos').value = jefe.lastnames;
        document.getElementById('jefe_fecha_nacimiento').value = jefe.birthdate;
        document.getElementById('jefe_genero').value = jefe.gender;
        document.getElementById('jefe_email').value = jefe.email;
        document.getElementById('jefe_contrasena').value = jefe.password;
        document.getElementById('jefe_rol').value = jefe.role;
        document.getElementById('jefe_carrera_id').value = jefe.careerId;

        $('#jefeModal').modal('show'); // Mostrar el modal
    }

    // Función para eliminar un jefe de carrera
    async function deleteJefe(rut) {
        try {
            const response = await fetch(`http://localhost:3000/api/career-heads/${rut}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await loadJefesCarrera(); // Recargar la lista después de eliminar
            } else {
                alert('Error al eliminar el jefe de carrera');
            }
        } catch (error) {
            console.error('Error al intentar eliminar el jefe de carrera:', error);
            alert('Ocurrió un error al intentar eliminar el jefe de carrera.');
        }
    }
});
