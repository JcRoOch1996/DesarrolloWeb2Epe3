document.addEventListener('DOMContentLoaded', async function () {
    const ProfesorList = document.getElementById('ProfesorList'); // Tabla de profesores

    // Carga los profesores al inicio
    await loadProfessors();

    // Maneja el evento de clic en el botón "Añadir Nuevo Profesor"
    document.getElementById('addProfesorBtn').addEventListener('click', function () {
        document.getElementById('ProfesorModalLabel').innerText = 'Añadir Profesor';
        document.getElementById('ProfesorForm').reset();
        $('#ProfesorModal').modal('show');
    });

    // Maneja el evento de envío del formulario de profesores
    document.getElementById('ProfesorForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el envío del formulario

        // Obtener valores del formulario
        const rut = document.getElementById('profesor_rut').value;
        const names = document.getElementById('profesor_nombres').value;
        const lastnames = document.getElementById('profesor_apellidos').value;
        const birthdate = document.getElementById('profesor_fecha_nacimiento').value;
        const gender = document.getElementById('profesor_genero').value;
        const email = document.getElementById('profesor_email').value;
        const password = document.getElementById('profesor_contrasena').value;
        const role = document.getElementById('profesor_rol').value;

        try {
            let response = await fetch(`http://localhost:3000/api/professors/${rut}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rut, names, lastnames, birthdate, gender, email, password, role })
            });

            if (response.status === 404) {
                // Si el rut no existe, crea un nuevo profesor
                response = await fetch('http://localhost:3000/api/professors/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rut, names, lastnames, birthdate, gender, email, password, role })
                });
            }

            if (response.ok) {
                $('#ProfesorModal').modal('hide'); // Oculta el modal si la operación es exitosa
                await loadProfessors();
            } else {
                const data = await response.json();
                alert('Error al guardar el profesor: ' + data.error);
            }
        } catch (error) {
            console.error('Error al intentar guardar el profesor:', error);
            alert('Ocurrió un error al intentar guardar el profesor.');
        }
    });

    // Función para cargar los profesores desde la API
    async function loadProfessors() {
        try {
            const response = await fetch('http://localhost:3000/api/professors/');
            if (response.ok) {
                const professors = await response.json(); // Convertir la respuesta en un array de profesores

                ProfesorList.innerHTML = ''; // Limpiar la lista de profesores existente
                professors.forEach(profesor => {
                    const row = document.createElement('tr'); // Crear una fila por cada profesor

                    // Contenido HTML de cada fila
                    row.innerHTML = `
                        <td>${profesor.rut}</td>
                        <td>${profesor.names}</td>
                        <td>${profesor.lastnames}</td>
                        <td>${profesor.birthdate}</td>
                        <td>${profesor.gender}</td>
                        <td>${profesor.email}</td>
                        <td>${profesor.password}</td>
                        <td>${profesor.role}</td>
                        <td>
                            <button class="btn btn-sm btn-primary editProfesorBtn">Editar</button>
                            <button class="btn btn-sm btn-danger deleteProfesorBtn">Eliminar</button>
                        </td>
                    `;

                    // Eventos de los botones de editar y eliminar
                    row.querySelector('.editProfesorBtn').addEventListener('click', () => editProfesor(profesor));
                    row.querySelector('.deleteProfesorBtn').addEventListener('click', () => deleteProfesor(profesor.rut));

                    ProfesorList.appendChild(row); // Añadir la fila a la tabla
                });
            } else {
                alert('Error al cargar los profesores');
            }
        } catch (error) {
            console.error('Error al cargar los profesores:', error);
            alert('Ocurrió un error al cargar los profesores.');
        }
    }

    // Función para editar un profesor
    function editProfesor(profesor) {
        document.getElementById('ProfesorModalLabel').innerText = 'Editar Profesor';
        document.getElementById('profesor_rut').value = profesor.rut; // Rellenar el formulario con los datos del profesor
        document.getElementById('profesor_nombres').value = profesor.names;
        document.getElementById('profesor_apellidos').value = profesor.lastnames;
        document.getElementById('profesor_fecha_nacimiento').value = profesor.birthdate;
        document.getElementById('profesor_genero').value = profesor.gender;
        document.getElementById('profesor_email').value = profesor.email;
        document.getElementById('profesor_contrasena').value = profesor.password;
        document.getElementById('profesor_rol').value = profesor.role;

        $('#ProfesorModal').modal('show'); // Mostrar el modal
    }

    // Función para eliminar un profesor
    async function deleteProfesor(rut) {
        try {
            const response = await fetch(`http://localhost:3000/api/professors/${rut}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await loadProfessors(); // Recargar la lista después de eliminar
            } else {
                alert('Error al eliminar el profesor');
            }
        } catch (error) {
            console.error('Error al intentar eliminar el profesor:', error);
            alert('Ocurrió un error al intentar eliminar el profesor.');
        }
    }
});
