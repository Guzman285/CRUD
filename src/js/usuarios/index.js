import { lenguaje } from '../lenguaje'; //archivo que ya esta en el MVC y pone el datatable en español
import { Toast, validarFormulario, confirmacion } from '../funciones'; // muestra notificacion y valida formularios
import { Modal } from 'bootstrap'; //se necesita para abrir los modales desde JS
import DataTable from 'datatables.net-bs5'; //la libreria para los datatables

// Agarramos los elementos del HTML que vamos a necesitar
const formUsuario = document.querySelector('#formUsuario');
const modalElement = document.querySelector('#modalUsuario');
const modalBS = new Modal(modalElement);
const spanLoader = document.getElementById('spanLoader');
const btnGuardar = document.getElementById('btnGuardar');

let datatableUsuarios = new DataTable('#datatableUsuarios', {
    language: lenguaje,
    data: null,
    columns: [
        {
            title: 'No.',
            width: '2%',
            render: (data, type, row, meta) => {
                return meta.row + 1;
            }
        },
        {
            title: 'Nombre',
            data: 'usu_nombre',
        },
        {
            title: 'Apellido',
            data: 'usu_apellido',
        },
        {
            title: 'Correo',
            data: 'usu_correo',
        },
        {
            title: 'Acciones',
            data: 'usu_id',
            render: (data, type, row) => {
                return `
                <div class='text-center'>
                    <button class="btn btn-warning btn-sm rounded-circle editar" title='Editar' data-id='${data}'>
                        <i class='bi bi-pencil'></i>
                    </button>
                    <button class="btn btn-danger btn-sm rounded-circle eliminar" title='Eliminar' data-id='${data}'>
                        <i class='bi bi-trash'></i>
                    </button>
                </div>`
            }
        },
    ]
});

const buscarApi = async () => {
    try {
        const url = `${RUTA_APP}/API/usuarios/buscar`;
        const headers = new Headers();
        headers.append('X-Requested-With', 'fetch');
        const config = {
            method: 'GET',
            headers,
        }

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje, datos } = data;

        datatableUsuarios.clear().draw();
        if(codigo == 1) {
            datatableUsuarios.rows.add(datos).draw();
        } else {
            Toast.fire({
                icon: 'info',
                title: mensaje,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const guardarApi = async (e) => {
    e.preventDefault();
    spanLoader.style.display = '';
    btnGuardar.disabled = true;

    if(!validarFormulario(formUsuario, ['usu_id'])) {
        Toast.fire({
            icon: 'warning',
            title: 'Revise la información ingresada',
        });
        spanLoader.style.display = 'none';
        btnGuardar.disabled = false;
        return;
    }

    try {
        const usu_id = formUsuario.usu_id.value;
const url = usu_id ? `${RUTA_APP}/API/usuarios/modificar` : `${RUTA_APP}/API/usuarios/guardar`;
        const headers = new Headers();
        headers.append('X-Requested-With', 'fetch');
        const body = new FormData(formUsuario);
        const config = {
            method: 'POST',
            headers,
            body,
        }

        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { codigo, mensaje } = data;

        if(codigo == 1) {
            Toast.fire({
                icon: 'success',
                title: mensaje,
            });
            formUsuario.reset();
            modalBS.hide();
            buscarApi();
        } else {
            Toast.fire({
                icon: 'error',
                title: mensaje,
            });
        }
    } catch (error) {
        console.log(error);
    }

    spanLoader.style.display = 'none';
    btnGuardar.disabled = false;
}

const editar = (e) => {
    const dataset = e.currentTarget.dataset;
    const id = dataset.id;

    // Llenamos el formulario con los datos de la fila
    const rowData = datatableUsuarios.row(e.currentTarget.closest('tr')).data();
    
    formUsuario.usu_id.value = rowData.usu_id;
    formUsuario.usu_nombre.value = rowData.usu_nombre;
    formUsuario.usu_apellido.value = rowData.usu_apellido;
    formUsuario.usu_correo.value = rowData.usu_correo;

    // Cambiamos el título del modal
    document.getElementById('modalTitleId').textContent = 'Editar Usuario';

    modalBS.show();
}

const eliminarApi = async (e) => {
    const dataset = e.currentTarget.dataset;
    const id = dataset.id;

    const confirmar = await confirmacion('¿Está seguro que desea eliminar este usuario?', 'warning', 'Si, eliminar');
    
    if(confirmar) {
        try {
            const url = `${RUTA_APP}/API/usuarios/eliminar`;
            const headers = new Headers();
            headers.append('X-Requested-With', 'fetch');
            const body = new FormData();
            body.append('usu_id', id);
            const config = {
                method: 'POST',
                headers,
                body,
            }

            const respuesta = await fetch(url, config);
            const data = await respuesta.json();
            const { codigo, mensaje } = data;

            if(codigo == 1) {
                Toast.fire({
                    icon: 'success',
                    title: mensaje,
                });
                buscarApi();
            } else {
                Toast.fire({
                    icon: 'error',
                    title: mensaje,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

buscarApi();
formUsuario.addEventListener('submit', guardarApi);
datatableUsuarios.on('click', '.editar', editar);
datatableUsuarios.on('click', '.eliminar', eliminarApi);