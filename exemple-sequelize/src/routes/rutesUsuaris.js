/**
 * rutesusuaris.js
 * Definició de les rutes relacionades amb els usuaris
 */

const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuariController');

/**
 * @swagger
 * /api/usuaris/comentaris/{id_usuari}:
 *   get:
 *     summary: Obté tots els comentaris d'un usuari
 *     description: Retorna una llista amb tots els comentaris
 *     tags: [Comentaris]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'usuari
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Llista de comentaris obtinguda amb èxit
 *       404:
 *         description: No ni ha cap usuari amb l'id posada
 *       500:
 *         description: Error intern del servidor
 */
router.get('/comentaris/:id', usuariController.obtenirComentaris);



/**
 * @swagger
 * /api/usuaris:
 *   post:
 *     summary: Crea un nou usuari
 *     description: Crea un nou usuari amb les dades proporcionades
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'usuari
 *               email:
 *                 type: string
 *                 description: Correu de l'usuari
 *               password:
 *                 type: string
 *                 description: Contrasenya de l'usuari
 *               nom:
 *                 type: string
 *                 description: Nom de l'usuari
 *               idioma:
 *                 type: string
 *                 description: Idioma de l'usuari
 *     responses:
 *       201:
 *         description: Vídeo creat amb èxit
 *       400:
 *         description: Dades invàlides
 *       404:
 *         description: Youtuber o categoria no trobada
 *       500:
 *         description: Error intern del servidor
 */
router.post('/', usuariController.crearUsuari);

module.exports = router;