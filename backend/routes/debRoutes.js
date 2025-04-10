const express = require("express");
const router = express.Router();
const controllerDeb = require("../controllers/debController");

//Esta implementacion queda temporalmente desactivada hasta se llegue a la parte de autenticacion de usuarios
//const { authenticateToken } = require('../middleware/authMiddleware');




/* RUTAS DE LOS ENDPOINTS, TOMAR EN CUENTA QUE SON SOLO PARA BASARNOS

//Endpoint para ver todos los debates
router.get("/debates", authenticateToken, controllerDeb.getAllDebates);

//Endpoint para agregar un debate
router.post('/debate', authenticateToken, controllerDeb.addDebate);

//Endpoint para definir la postura sobre un tema
router.post("/debate/:id/position", authenticateToken, controllerDeb.setDebatePosition);

//Endpoint para agregar comentario a un debate
router.post("/debate/:id", authenticateToken, controllerDeb.addCommentToDebate);

//Endpoint para editar un comentario 
router.put("/comment/:idComentario", authenticateToken, controllerDeb.updateComment);

*/

module.exports = router;
