// Función para obtener la fecha actual en formato YYYY-MM-DD
function obtenerFechaActual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

// Fijar la fecha de la consulta con la fecha actual al cargar la página
document.getElementById('fechaConsulta').value = obtenerFechaActual();

function calcularEdad() {
    var fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    var fechaConsulta = new Date(document.getElementById('fechaConsulta').value);

    var edadEnAnios = fechaConsulta.getFullYear() - fechaNacimiento.getFullYear();
    var meses = fechaConsulta.getMonth() - fechaNacimiento.getMonth();

    if (fechaConsulta.getDate() < fechaNacimiento.getDate()) {
        meses--;
    }

    if (meses < 0) {
        meses = 12 + meses;
        edadEnAnios--;
    }

    var mensaje = ''; // Inicializar 'mensaje'

    if (edadEnAnios > 0 || meses > 0) {
        if (edadEnAnios <= 2) {
            // Para edades menores o iguales a 2 años, mostrar en años y meses
            mensaje += 'Edad: ';
            if (edadEnAnios > 0) {
                mensaje += edadEnAnios === 1 ? '1 año' : edadEnAnios + ' años';
            }

            if (edadEnAnios > 0 && meses > 0) {
                mensaje += ' y ';
            }

            if (meses > 0) {
                mensaje += meses === 1 ? '1 mes' : meses + ' meses';
            }

            // También mostrar la edad solo en meses
            mensaje += ' | Edad en meses: ' + (edadEnAnios * 12 + meses) + ' meses';

        } else {
            // Para edades mayores a 2 años, mostrar solo en años y meses
            mensaje += 'Edad: ';
            mensaje += edadEnAnios === 1 ? '1 año' : edadEnAnios + ' años';

            if (meses > 0) {
                mensaje += ' y ';
                mensaje += meses === 1 ? '1 mes' : meses + ' meses';
            }
        }
    }

    // Mostrar el mensaje donde desees (puedes modificar esto según tus necesidades)
    return mensaje;
}

// Mover o envolver en un evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fechaConsulta').value = obtenerFechaActual();
});

function verificarEdad() {
    // Llama a la función calcularEdad para obtener el mensaje con la edad
    var edadTexto = calcularEdad();
    var edadEnAnios = parseInt(edadTexto.split(' ')[1]); // Extrae la edad en años

    // Muestra la edad en el contenedor en la página
    document.getElementById('edadContainer').innerHTML = edadTexto;

    // Verifica si la edad es igual o menor a 2 años
    if (edadEnAnios <= 2) {
        // Si es igual o menor a 2 años, muestra la pregunta de la Circunferencia Cefálica
        var circunferenciaCefalicaLabel = document.getElementById('circunferenciaCefalicaLabel');
        var circunferenciaCefalicaInput = document.getElementById('circunferenciaCefalica');

        // Hacer visible el campo de la Circunferencia Cefálica
        circunferenciaCefalicaLabel.style.display = 'inline-block';
        circunferenciaCefalicaInput.style.display = 'inline-block';
    } else {
        // Si es mayor a 2 años, oculta la pregunta de la Circunferencia Cefálica
        console.log("La Circunferencia Cefálica no aplica para edades mayores a 2 años");

        // Ocultar el campo de la Circunferencia Cefálica
        var circunferenciaCefalicaLabel = document.getElementById('circunferenciaCefalicaLabel');
        var circunferenciaCefalicaInput = document.getElementById('circunferenciaCefalica');

        circunferenciaCefalicaLabel.style.display = 'none';
        circunferenciaCefalicaInput.style.display = 'none';
    }

    // Asegurarse de que la función verificarEdad esté definida antes de llamarla
    if (typeof verificarEdad === 'function') {
        verificarEdad();
    }
}


function enviarRespuestas() {
    // Recopilar respuestas
    var email = document.getElementById('email').value;
    var nombre = document.getElementById('nombre').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;
    var fechaConsulta = document.getElementById('fechaConsulta').value;
    var genero = document.getElementById('genero').value;
    var peso = document.getElementById('peso').value;
    var talla = document.getElementById('talla').value;
    var circunferenciaCefalica = document.getElementById('circunferenciaCefalica').value;

    // Validar el formato del correo electrónico
    var emailValido = validarEmail(email);

    if (!emailValido) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return; // Detener el proceso si el correo no es válido
    }

    // Llama a la función calcularEdad para obtener el mensaje con la edad
    var edadTexto = calcularEdad(fechaNacimiento, fechaConsulta);
    var edadEnAnios = parseInt(edadTexto.split(' ')[1]); // Extrae la edad en años
    var meses = parseInt(edadTexto.split(' ')[5]); // Extrae la edad en meses

    // Llama a la función calcularIMC para obtener el IMC
    var imc = calcularIMC(peso, talla, edadTexto);


    // Por ahora, simplemente las mostraremos en la consola.
    console.log("Correo Electrónico: " + email);
    console.log("Nombre del Paciente: " + nombre);
    console.log("Fecha de Nacimiento: " + fechaNacimiento);
    console.log("Fecha de la Consulta: " + fechaConsulta);
    console.log("Género del Paciente: " + genero);
    console.log("Peso en kg: " + peso);
    console.log("Talla en cm: " + talla);
    console.log(edadTexto); // Muestra el mensaje con la edad en la consola
    console.log("Circunferencia Cefálica en cm: " + circunferenciaCefalica);

    

    // Llama a la función calcularEdad para obtener el mensaje con la edad
    var edadTexto = calcularEdad(fechaNacimiento, fechaConsulta);

    // Calcular IMC
    var alturaMetros = talla / 100; // Convertir la talla a metros
    var imc = peso / (alturaMetros * alturaMetros);

    // Llama a la función calcularIMC para obtener el IMC
    var imc = calcularIMC(peso, talla, edadTexto);

    // Mostrar la edad en la página
    document.getElementById('edadContainer').innerHTML = edadTexto;

    console.log("Edad Texto: " + edadTexto);
    console.log("IMC: " + imc);
    window.location.href = "/resultados" + "?edadTexto=" + encodeURIComponent(edadTexto) + "&imc=" + encodeURIComponent(imc);


    // Borra las respuestas estableciendo los valores a cadena vacía
    document.getElementById('email').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('fechaConsulta').value = obtenerFechaActual(); // Restaura la fecha de la consulta a la actual
    document.getElementById('genero').value = 'Niña'; // Puedes establecer el valor predeterminado que desees
    document.getElementById('peso').value = '';
    document.getElementById('talla').value = '';
    document.getElementById('circunferenciaCefalica').value = '';

    // Reiniciar el campo de la Circunferencia Cefálica y mostrar el contenedor
    var circunferenciaCefalicaLabel = document.getElementById('circunferenciaCefalicaLabel');
    var circunferenciaCefalicaInput = document.getElementById('circunferenciaCefalica');

    circunferenciaCefalicaLabel.style.display = 'none';
    circunferenciaCefalicaInput.style.display = 'none';

}

// Función para validar el formato de correo electrónico
function validarEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function calcularIMC(peso, talla, edadTexto) {
    var alturaMetros = talla / 100; // Convertir la talla a metros
    var imc = peso / (alturaMetros * alturaMetros);

    // Redondear el IMC a dos decimales
    imc = parseFloat(imc.toFixed(2));

    return imc;

}


