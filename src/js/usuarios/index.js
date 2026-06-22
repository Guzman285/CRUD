import { lenguaje } from '../lenguaje'; //archivo que ya esta en el MVC y pone el datatable en español
import { Toast, validarFormulario } from '../funciones'; // muestra notificacion y valida formularios
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

buscarApi();