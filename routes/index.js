var express = require('express');
var router = express.Router();
var db = require('../queries');
require('dotenv').config();


/**
 * @swagger
 * definitions:
 *   Aluno:
 *     properties:
 *       nome:
 *         type: string
 *       matricula:
 *         type: string
 *       nota:
 *         type: float
 *       endereco_id:
 *         type: integer
 */

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     tags:
 *       - Alunos
 *     description: Returns all alunos
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of alunos
 *         schema:
 *           $ref: '#/definitions/Aluno'
 */
router.get('/api/alunos', db.getAllAlunos);
/**
 * @swagger
 * /api/alunos/{id}:
 *   get:
 *     tags:
 *       - Alunos
 *     description: Returns a single aluno
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Aluno's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single aluno
 *         schema:
 *           $ref: '#/definitions/Aluno'
 */
router.get('/api/alunos/:id', db.getSingleAluno);
/**
 * @swagger
 * /api/infoalunos:
 *   get:
 *     tags:
 *       - Gerais
 *     description: Returns estatisticas dos alunos
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of alunos
 *         schema:
 *           $ref: '#/definitions/Gerais'
 */
router.get('/api/infoalunos',db.getInfoAlunos);
/**
 * @swagger
 * /api/enderecos:
 *   get:
 *     tags:
 *       - Endereco
 *     description: Returns all enderecos
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de todos os enderecos
 *         schema:
 *           $ref: '#/definitions/Endereco'
 */
router.get('/api/enderecos',db.getAllEndereco);
/**
 * @swagger
 * /api/bairro:
 *   get:
 *     tags:
 *       - Gerais
 *     description: Retura lista de todos enderecos
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Informacoes gerais/estatisticas sobre os bairros
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single aluno
 *         schema:
 *           $ref: '#/definitions/Gerais'
 */
router.get('/api/bairro',db.getInfoBairro);
/**
 * @swagger
 * /api/puppies:
 *   post:
 *     tags:
 *       - Alunos
 *     description: Cadasta um novo aluno
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: aluno novo
 *         description: objeto do Aluno 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Aluno'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/api/puppies', db.createAluno);
/**
 * @swagger
 * /api/endereco:
 *   post:
 *     tags:
 *       - Endereco
 *     description: Cadasta um novo endereco
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: endereco novo
 *         description: objeto do Endereco 
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Endereco'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/api/endereco',db.createEndereco);


// application -------------------------------------------------------------
router.get('/', function (req, res) {

    res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;