/**
 * Introduce el nuevo usuario en el sistema. Su login debe ser unico.
 * Ni el login ni el password pueden ser vacios.
 */
exports.register = function (req, res) {
	
}

/**
 * El usuario entra en el sistema
 */
exports.login = function(req, res) {
	
}

/**
 * El usuario sale del sistema
 */
exports.logout = function (req, res) {
	
}

/**
 * Comprueba que el usuario esta autenticado y autorizado para realizar
 * una operacion protegida en el sistema.
 */
exports.checkAuth = function(req, res, next) {
	
}

/**
 * Comprueba que el usuario esta autenticado y autorizado para acceder
 * a la página. En caso negativo redirige a la página principal.
 */
exports.checkAuthRedirect = function(req, res, next) {
	
}

/**
 * Devuelve una lista completa de usuarios en el sistema
 */
exports.list = function(req, res) {
	
}