let tareas = [
    { id: 1, descripcion: 'Leer material de plataforma', completada: false },
    { id: 2, descripcion: 'Asistir a clases', completada: false },
    { id: 3, descripcion: 'Asistir a ayudantías', completada: false }
];

let proximoId = 4;

mostrarTareas();

function agregarTarea() {
    const input = document.getElementById('inputTarea');
    const descripcion = input.value.trim();

    if (descripcion === '') return;

    const nuevaTarea = {
        id: proximoId,
        descripcion: descripcion,
        completada: false
    };

    tareas.push(nuevaTarea);
    proximoId++;

    input.value = '';
    mostrarTareas();
}

function mostrarTareas() {
    const tabla = document.getElementById('listaTareas');
    tabla.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const fila = document.createElement('tr');

        const celdaId = document.createElement('td');
        celdaId.textContent = tarea.id;

        const celdaDescripcion = document.createElement('td');
        celdaDescripcion.textContent = tarea.descripcion;
        if (tarea.completada) {
            celdaDescripcion.className = 'realizada';
        }

        const celdaEstado = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;
        checkbox.addEventListener('change', () => cambiarEstado(index));
        celdaEstado.appendChild(checkbox);

        const celdaEliminar = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = '✖';
        botonEliminar.className = 'delete';
        botonEliminar.addEventListener('click', () => borrarTarea(index));
        celdaEliminar.appendChild(botonEliminar);

        fila.appendChild(celdaId);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaEstado);
        fila.appendChild(celdaEliminar);

        tabla.appendChild(fila);
    });

    actualizarResumen();
}

function borrarTarea(index) {
    tareas.splice(index, 1);
    mostrarTareas();
}

function cambiarEstado(index) {
    tareas[index].completada = !tareas[index].completada;
    mostrarTareas();
}

function actualizarResumen() {
    document.getElementById('totalTareas').textContent = tareas.length;

    const realizadas = tareas.filter(tarea => tarea.completada).length;
    document.getElementById('tareasRealizadas').textContent = realizadas;
}
