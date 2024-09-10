document.addEventListener('DOMContentLoaded', async function () {
    const alumnoList = document.getElementById('alumnoList'); // Tabla de alumnos

    // Carga los alumnos al inicio
    await loadAlumnos();

    // Maneja el evento de clic en el botón "Añadir Nuevo Alumno"
    document.getElementById('addAlumnoBtn').addEventListener('click', function () {
        document.getElementById('alumnoModalLabel').innerText = 'Añadir Alumno';
        document.getElementById('alumnoForm').reset();
        $('#alumnoModal').modal('show');
    });

    // Maneja el evento de envío del formulario de alumnos
    document.getElementById('alumnoForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el envío del formulario

        // Obtener valores del formulario
        const rut = document.getElementById('alumno_rut').value;
        const names = document.getElementById('alumno_nombres').value;
        const lastnames = document.getElementById('alumno_apellidos').value;
        const birthdate = document.getElementById('alumno_fecha_nacimiento').value;
        const gender = document.getElementById('alumno_genero').value;
        const email = document.getElementById('alumno_email').value;
        const password = document.getElementById('alumno_contrasena').value;
        const role = document.getElementById('alumno_rol').value;
        const courseId = document.getElementById('alumno_curso_id').value;

        try {
            let response = await fetch(`http://localhost:3000/api/students/${rut}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rut, names, lastnames, birthdate, gender, email, password, role, courseId })
            });

            if (response.status === 404) {
                // Si el rut no existe, crea un nuevo alumno
                response = await fetch('http://localhost:3000/api/students/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rut, names, lastnames, birthdate, gender, email, password, role, courseId })
                });
            }

            if (response.ok) {
                $('#alumnoModal').modal('hide'); // Oculta el modal si la operación es exitosa
                await loadAlumnos();
            } else {
                const data = await response.json();
                alert('Error al guardar el alumno: ' + data.error);
            }
        } catch (error) {
            console.error('Error al intentar guardar el alumno:', error);
            alert('Ocurrió un error al intentar guardar el alumno.');
        }
    });

    // Función para cargar los alumnos desde la API
    async function loadAlumnos() {
        try {
            const response = await fetch('http://localhost:3000/api/students/');
            if (response.ok) {
                const alumnos = await response.json(); // Convertir la respuesta en un array de alumnos

                alumnoList.innerHTML = ''; // Limpiar la lista de alumnos existente
                alumnos.forEach(alumno => {
                    const row = document.createElement('tr'); // Crear una fila por cada alumno

                    // Contenido HTML de cada fila
                    row.innerHTML = `
                        <td>${alumno.rut}</td>
                        <td>${alumno.names}</td>
                        <td>${alumno.lastnames}</td>
                        <td>${alumno.birthdate}</td>
                        <td>${alumno.gender}</td>
                        <td>${alumno.email}</td>
                        <td>${alumno.password}</td>
                        <td>${alumno.role}</td>
                        <td>${alumno.courseId}</td>
                        <td>
                            <button class="btn btn-sm btn-primary editAlumnoBtn">Editar</button>
                            <button class="btn btn-sm btn-danger deleteAlumnoBtn">Eliminar</button>
                        </td>
                    `;

                    // Eventos de los botones de editar y eliminar
                    row.querySelector('.editAlumnoBtn').addEventListener('click', () => editAlumno(alumno));
                    row.querySelector('.deleteAlumnoBtn').addEventListener('click', () => deleteAlumno(alumno.rut));

                    alumnoList.appendChild(row); // Añadir la fila a la tabla
                });
            } else {
                alert('Error al cargar los alumnos');
            }
        } catch (error) {
            console.error('Error al cargar los alumnos:', error);
            alert('Ocurrió un error al cargar los alumnos.');
        }
    }

    // Función para editar un alumno
    function editAlumno(alumno) {
        document.getElementById('alumnoModalLabel').innerText = 'Editar Alumno';
        document.getElementById('alumno_rut').value = alumno.rut; // Rellenar el formulario con los datos del alumno
        document.getElementById('alumno_nombres').value = alumno.names;
        document.getElementById('alumno_apellidos').value = alumno.lastnames;
        document.getElementById('alumno_fecha_nacimiento').value = alumno.birthdate;
        document.getElementById('alumno_genero').value = alumno.gender;
        document.getElementById('alumno_email').value = alumno.email;
        document.getElementById('alumno_contrasena').value = alumno.password;
        document.getElementById('alumno_rol').value = alumno.role;
        document.getElementById('alumno_curso_id').value = alumno.courseId;

        $('#alumnoModal').modal('show'); // Mostrar el modal
    }

    // Función para eliminar un alumno
    async function deleteAlumno(rut) {
        try {
            const response = await fetch(`http://localhost:3000/api/students/${rut}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await loadAlumnos(); // Recargar la lista después de eliminar
            } else {
                alert('Error al eliminar el alumno');
            }
        } catch (error) {
            console.error('Error al intentar eliminar el alumno:', error);
            alert('Ocurrió un error al intentar eliminar el alumno.');
        }
    }
});
