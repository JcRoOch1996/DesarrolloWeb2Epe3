// Función para cambiar entre pestañas
function openTab(evt, tabName) {
    // Obtener todos los elementos con clase "tab-content" y ocultarlos
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Obtener todos los botones con clase "tab-link" y quitarles la clase "active"
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostrar el contenido de la pestaña actual y agregar la clase "active" al botón correspondiente
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}
