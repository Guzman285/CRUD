<h1><?= $titulo ?></h1>

<div class="row justify-content-center">
    <div class="col table-responsive">
        <table class="table table-bordered table-hover w-100" id="datatableUsuarios">
            <thead class="text-center"></thead>
            <tbody class="text-center"></tbody>
        </table>
    </div>
</div>

<!-- Btn flotante para abrir modal de creacion-->
<button data-bs-toggle="modal" data-bs-target="#modalUsuario" class="btn btn-primary btn-lg rounded-circle float-button">
    <i class="bi bi-plus-lg"></i>
</button>

<!-- Modal para crear y modificar -->
<div class="modal fade" id="modalUsuario" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">Crear Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form class="modal-body" id="formUsuario">
                <input type="hidden" name="usu_id" id="usu_id">
                <div class="row mb-3">
                    <div class="col">
                        <label for="usu_nombre">Nombre</label>
                        <input type="text" name="usu_nombre" id="usu_nombre" class="form-control">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <label for="usu_apellido">Apellido</label>
                        <input type="text" name="usu_apellido" id="usu_apellido" class="form-control">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <label for="usu_correo">Correo</label>
                        <input type="email" name="usu_correo" id="usu_correo" class="form-control">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <label for="usu_password">Password</label>
                        <input type="password" name="usu_password" id="usu_password" class="form-control">
                    </div>
                </div>
            </form>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" form="formUsuario" id="btnGuardar" class="btn btn-primary">
                    Guardar
                    <span class="spinner-grow spinner-grow-sm ms-2" id="spanLoader" style="display:none;"></span>
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    const RUTA_APP = '/<?= $_ENV['APP_NAME'] ?>';
</script>
<script src="<?= asset('build/js/usuarios/index.js') ?>"></script>