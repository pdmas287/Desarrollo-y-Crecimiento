try {
    // Obtener los parámetros de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var edadTexto = urlParams.get('edadTexto');
    var imc = urlParams.get('imc');

    // Verificar si los parámetros están presentes y son válidos
    if (!edadTexto || !imc) {
        throw new Error('No se han proporcionado datos válidos en la URL.');
    }

    // Mostrar la edad en la página
    document.body.innerHTML += "<p>" + edadTexto + "</p>";

    // Mostrar el resultado del IMC solo si la edad es mayor a 4 años
    var edadEnAnios = parseInt(edadTexto.split(' ')[1]); // Extrae la edad en años
    if (edadEnAnios > 4) {
        document.body.innerHTML += "<p>Índice de Masa Corporal (IMC): " + imc + "</p>";
    } else {
        document.body.innerHTML += "<p>El IMC no aplica para edad menor o igual a 5 años.</p>";
    }

    // Agregar un botón para volver a la página del cuestionario
    var backButton = document.createElement("button");
    backButton.innerHTML = "Volver al Cuestionario";
    backButton.onclick = function() {
        // Redirigir a la página del cuestionario
        window.location.href = cuestionarioUrl;

    };
    document.body.appendChild(backButton);
} catch (error) {
    // Manejar el error
    console.error('Error al procesar los parámetros de la URL:', error.message);

    // Mostrar un mensaje de error en la página
    document.body.innerHTML = "<p>Error: " + error.message + "</p>";
}
