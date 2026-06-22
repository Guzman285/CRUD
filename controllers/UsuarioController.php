<?php

namespace Controllers;

use Exception;
use Model\Usuario;
use MVC\Router;

class UsuarioController
{
    public static function index(Router $router)
    {
        // Renderizar la vista
        $router->render('usuarios/index', [
            'titulo' => 'Control de Usuarios'
        ]);
    }

    public static function buscarAPI()
    {
        getHeadersApi();

        try {
            $usuarios = Usuario::fetchArray("SELECT * FROM usuarios WHERE usu_situacion = 1");

            echo json_encode([
                'codigo' => 1,
                'mensaje' => count($usuarios) . ' usuario/s encontrados',
                'datos' => $usuarios
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al obtener usuarios',
                'datos' => null,
                'detalle' => $e->getMessage()
            ]);
        }
    }

    public static function guardarAPI()
    {
        getHeadersApi();

        try {
            $usuario = new Usuario($_POST);
            $usuario->crear();

            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Usuario creado correctamente',
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al crear usuario',
                'detalle' => $e->getMessage()
            ]);
        }
    }

    public static function modificarAPI()
    {
        getHeadersApi();

        try {
            $usuario = Usuario::find($_POST['usu_id']);
            $usuario->sincronizar($_POST);
            $usuario->actualizar();

            echo json_encode([
                'codigo' => 1,
                'mensaje' => 'Usuario actualizado correctamente',
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'codigo' => 0,
                'mensaje' => 'Error al actualizar usuario',
                'detalle' => $e->getMessage()
            ]);
        }
    }
}
