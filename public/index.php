<?php
require_once __DIR__ . '/../includes/app.php';


use MVC\Router;
use Controllers\AppController;
use Controllers\UsuarioController; //controlador de usuarios

$router = new Router();
$router->setBaseURL('/' . $_ENV['APP_NAME']);

$router->get('/', [AppController::class, 'index']);

//rutas de usuarios
$router->get('/usuarios', [UsuarioController::class, 'index']);
$router->get('/API/usuarios/buscar', [UsuarioController::class, 'buscarAPI']);
$router->post('/API/usuarios/guardar', [UsuarioController::class, 'guardarAPI']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();
