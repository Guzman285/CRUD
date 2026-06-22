<?php

namespace Model; // Indica que esta clase pertenece a la carpeta models/

class Usuario extends ActiveRecord // Hereda todos los métodos de ActiveRecord (all, find, crear, actualizar, etc.)
{

    protected static $tabla = 'usuarios'; // Nombre de la tabla en la base de datos
    protected static $idTabla = 'usu_id'; // Columna que es la llave primaria de la tabla
    protected static $columnasDB = ['usu_nombre', 'usu_apellido', 'usu_correo', 'usu_password', 'usu_situacion']; // Columnas que se van a usar al insertar o actualizar (sin incluir el ID)

    // Una propiedad por cada columna de la tabla (estas guardan los datos del usuario)
    public $usu_id;
    public $usu_nombre;
    public $usu_apellido;
    public $usu_correo;
    public $usu_password;
    public $usu_situacion;

    // Constructor: se ejecuta al crear un objeto Usuario, asigna los valores recibidos
    // $args es el arreglo de datos que se le pasa (ejemplo: $_POST)
    // ?? significa "si no existe ese dato, usá el valor de la derecha"
    public function __construct($args = [])
    {
        $this->usu_id       = $args['usu_id']       ?? null; // null porque un usuario nuevo aún no tiene ID
        $this->usu_nombre   = $args['usu_nombre']   ?? "";
        $this->usu_apellido = $args['usu_apellido'] ?? "";
        $this->usu_correo   = $args['usu_correo']   ?? "";
        $this->usu_password = $args['usu_password'] ?? "";
        $this->usu_situacion = $args['usu_situacion'] ?? 1; // 1 = activo por defecto
    }
}
