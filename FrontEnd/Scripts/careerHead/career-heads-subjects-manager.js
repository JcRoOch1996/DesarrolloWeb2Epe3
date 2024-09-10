document.addEventListener('DOMContentLoaded', async function() {
    const SubjectList = document.getElementById('SubjectList'); // Obtiene la referencia a la lista de asignaturas en el DOM

    // Carga las asignaturas al inicio
    await loadSubjects();

    // Maneja el evento de clic en el botón "Añadir Asignatura"
    document.getElementById('addSubjectBtn').addEventListener('click', function() {
        document.getElementById('SubjectModalLabel').innerText = 'Añadir Asignatura';
        document.getElementById('SubjectForm').reset();
        document.getElementById('id').value = '';
        $('#SubjectModal').modal('show');
    });

    // Maneja el evento de envío del formulario de asignatura
    document.getElementById('SubjectForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado de recargar la página

        // Obtiene los valores del formulario
        const id = document.getElementById('id').value;
        const subject_code = document.getElementById('subject_code').value;
        const subject_name = document.getElementById('subject_name').value;
        const profesorId = document.getElementById('profesorId').value;

        try {
            let response;
            if (id) {
                // Si hay un ID, actualizar la asignatura existente (método PUT)
                response = await fetch(`http://localhost:3000/api/subjects/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subject_code, subject_name, profesorId  }) // Envía los datos en formato JSON
                });
            } else {
                // Si no hay ID, crear una nueva asignatura (método POST)
                response = await fetch('http://localhost:3000/api/subjects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subject_code, subject_name, profesorId }) 
                });
            }

            if (response.ok) {
                $('#SubjectModal').modal('hide');
                await loadSubjects(); // Recarga la lista de asignaturas después de agregar o actualizar
            } else {
                const data = await response.json();
                alert('Error al guardar la asignatura: ' + data.error); // Muestra un mensaje de error si algo salió mal
            }
        } catch (error) {
            console.error('Error al intentar guardar la asignatura:', error); // Loguea el error en la consola
            alert('Ocurrió un error al intentar guardar la asignatura.'); // Muestra un mensaje de error al usuario
        }
    });

    // Función para cargar las asignaturas desde la API
    async function loadSubjects() {
        try {
            const response = await fetch('http://localhost:3000/api/subjects');

            if (response.ok) {
                const subjects = await response.json(); // Convierte la respuesta en un array de asignaturas

                SubjectList.innerHTML = ''; // Limpia la lista de asignturas existente
                subjects.forEach(subject => {
                    const row = document.createElement('tr'); // Crea una nueva fila para cada asignatura

                    // Define el contenido HTML de la fila, incluyendo botones para editar y eliminar
                    row.innerHTML = `
                        <td>${subject.id}</td>
                        <td>${subject.subject_code}</td>
                        <td>${subject.subject_name}</td>
                        <td>${subject.profesorId}</td>
                        <td>
                            <button class="btn btn-sm btn-primary editSubjectBtn">Editar</button>
                            <button class="btn btn-sm btn-danger deleteSubjectBtn">Eliminar</button>
                        </td>
                    `;

                    // Añade manejadores de eventos a los botones de editar y eliminar
                    row.querySelector('.editSubjectBtn').addEventListener('click', () => editSubject(subject));
                    row.querySelector('.deleteSubjectBtn').addEventListener('click', () => deleteSubject(subject.id));

                    SubjectList.appendChild(row); // Añade la fila a la lista de asignaturas en el DOM
                });
            } else {
                alert('Error al cargar las asignaturas'); // Muestra un mensaje de error si algo salió mal al cargar las asignaturas
            }
        } catch (error) {
            console.error('Error al cargar las asignatura:', error); // Loguea el error en la consola
            alert('Ocurrió un error al cargar las asignatura.'); // Muestra un mensaje de error al usuario
        }
    }

    // Función para editar una asignatura
    function editSubject(subject) {
        document.getElementById('SubjectModalLabel').innerText = 'Editar Asignatura'; // Cambia el título del modal
        document.getElementById('subject_code').value = subject.subject_code; // Rellena el formulario con los datos de la asignatura
        document.getElementById('subject_name').value = subject.subject_name;
        document.getElementById('profesorId').value = subject.profesorId; // Rellena el nuevo campo
        document.getElementById('id').value = subject.id; // Establece el ID de la asignatura en el campo oculto

        $('#SubjectModal').modal('show'); // Muestra el modal para editar la asinatura
    }

    // Función para eliminar una asignatura
    async function deleteSubject(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/subjects/${id}`, {
                method: 'DELETE' // Método DELETE para eliminar la asignatura
            });

            if (response.ok) {
                await loadSubjects(); // Recarga la lista de asignaturas después de eliminar
            } else {
                alert('Error al eliminar la asignatura'); // Muestra un mensaje de error si algo salió mal
            }
        } catch (error) {
            console.error('Error al intentar eliminar la asignatura:', error); // Loguea el error en la consola
            alert('Ocurrió un error al intentar eliminar la asignatura.'); // Muestra un mensaje de error al usuario
        }
    }
});
