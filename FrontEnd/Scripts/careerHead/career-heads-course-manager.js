document.addEventListener('DOMContentLoaded', async function() {
    const CourseList = document.getElementById('CourseList'); // Obtiene la referencia a la lista de cursos en el DOM

    // Carga los cursos al inicio
    await loadCourses();

    // Maneja el evento de clic en el botón "Añadir Curso"
    document.getElementById('addCourseBtn').addEventListener('click', function() {
        document.getElementById('CourseModalLabel').innerText = 'Añadir Curso';
        document.getElementById('CourseForm').reset();
        document.getElementById('id').value = '';
        $('#CourseModal').modal('show');
    });

    // Maneja el evento de envío del formulario de curso
    document.getElementById('CourseForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado de recargar la página

        // Obtiene los valores del formulario
        const id = document.getElementById('id').value;
        const course_code = document.getElementById('course_code').value;
        const course_name = document.getElementById('course_name').value;
        const careerId = document.getElementById('career_id').value; // Nuevo campo agregado

        try {
            let response;
            if (id) {
                // Si hay un ID, actualizar el curso existente (método PUT)
                response = await fetch(`http://localhost:3000/api/courses/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ course_code, course_name, careerId }) // Envía los datos en formato JSON
                });
            } else {
                // Si no hay ID, crear un nuevo curso (método POST)
                response = await fetch('http://localhost:3000/api/courses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ course_code, course_name, careerId }) 
                });
            }

            if (response.ok) {
                $('#CourseModal').modal('hide');
                await loadCourses(); // Recarga la lista de cursos después de agregar o actualizar
            } else {
                const data = await response.json();
                alert('Error al guardar el curso: ' + data.error); // Muestra un mensaje de error si algo salió mal
            }
        } catch (error) {
            console.error('Error al intentar guardar el curso:', error); // Loguea el error en la consola
            alert('Ocurrió un error al intentar guardar el curso.'); // Muestra un mensaje de error al usuario
        }
    });

    // Función para cargar los cursos desde la API
    async function loadCourses() {
        try {
            const response = await fetch('http://localhost:3000/api/courses');

            if (response.ok) {
                const courses = await response.json(); // Convierte la respuesta en un array de cursos

                CourseList.innerHTML = ''; // Limpia la lista de cursos existente
                courses.forEach(course => {
                    const row = document.createElement('tr'); // Crea una nueva fila para cada curso

                    // Define el contenido HTML de la fila, incluyendo botones para editar y eliminar
                    row.innerHTML = `
                        <td>${course.id}</td>
                        <td>${course.course_code}</td>
                        <td>${course.course_name}</td>
                        <td>${course.careerId}</td>
                        <td>
                            <button class="btn btn-sm btn-primary editCourseBtn">Editar</button>
                            <button class="btn btn-sm btn-danger deleteCourseBtn">Eliminar</button>
                        </td>
                    `;

                    // Añade manejadores de eventos a los botones de editar y eliminar
                    row.querySelector('.editCourseBtn').addEventListener('click', () => editCourse(course));
                    row.querySelector('.deleteCourseBtn').addEventListener('click', () => deleteCourse(course.id));

                    CourseList.appendChild(row); // Añade la fila a la lista de cursos en el DOM
                });
            } else {
                alert('Error al cargar los cursos'); // Muestra un mensaje de error si algo salió mal al cargar los cursos
            }
        } catch (error) {
            console.error('Error al cargar los cursos:', error); // Loguea el error en la consola
            alert('Ocurrió un error al cargar los cursos.'); // Muestra un mensaje de error al usuario
        }
    }

    // Función para editar un curso
    function editCourse(course) {
        document.getElementById('CourseModalLabel').innerText = 'Editar Curso'; // Cambia el título del modal
        document.getElementById('course_code').value = course.course_code; // Rellena el formulario con los datos del curso
        document.getElementById('course_name').value = course.course_name;
        document.getElementById('career_id').value = course.careerId; // Rellena el nuevo campo
        document.getElementById('id').value = course.id; // Establece el ID del curso en el campo oculto

        $('#CourseModal').modal('show'); // Muestra el modal para editar el curso
    }

    // Función para eliminar un curso
    async function deleteCourse(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/${id}`, {
                method: 'DELETE' // Método DELETE para eliminar el curso
            });

            if (response.ok) {
                await loadCourses(); // Recarga la lista de cursos después de eliminar
            } else {
                alert('Error al eliminar el curso'); // Muestra un mensaje de error si algo salió mal
            }
        } catch (error) {
            console.error('Error al intentar eliminar el curso:', error); // Loguea el error en la consola
            alert('Ocurrió un error al intentar eliminar el curso.'); // Muestra un mensaje de error al usuario
        }
    }
});
