var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5433/puppies';
var db = pgp(connectionString);

//RETORNA LISTA COM TODOS OS ALUNOS
function getAllAlunos(req, res, next) {
  db.any('select id,nome from aluno')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Recebeu todos os alunos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllEndereco(req, res, next) {
    db.any('select * from endereco')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Listou todos os enderecos'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

function getInfoBairro(req, res, next) {
    db.any('SELECT COUNT(nome) alunosnessebairro ,AVG(nota) media,'+
    ' bairro FROM aluno INNER JOIN endereco ON aluno.endereco_id = endereco.id GROUP BY bairro')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Recebeu todas as informacoes'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

function getInfoAlunos(req, res, next) {
    db.any('SELECT COUNT(nome) qtdeAlunos,AVG(nota) mediaAlunos FROM aluno')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Recebeu todas as informacoes'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }


//RETORNA 1 ALUNO
function getSingleAluno(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('SELECT * FROM aluno INNER JOIN endereco ON aluno.endereco_id = endereco.id WHERE aluno.id= $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou um aluno'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
//cadastrar aluno
function createAluno(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into aluno(nome, matricula, nota, endereco_id)' +
      'values(${nome}, ${matricula}, ${nota}, ${endereco_id})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inseriu aluno'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
//criar endereco
function createEndereco(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into aluno(id, rua, numero, bairro)' +
        'values(${id}, ${rua}, ${numero}, ${bairro})',
      req.body)
      .then(function () {
        res.status(200)
          .json({
            status: 'success',
            message: 'Inseriu endereco'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }





module.exports = {
  getAllAlunos: getAllAlunos,
  getSingleAluno: getSingleAluno,
  createAluno: createAluno,
  createEndereco: createEndereco,
  getInfoBairro: getInfoBairro,
  getAllEndereco: getAllEndereco,
  getInfoAlunos: getInfoAlunos
};