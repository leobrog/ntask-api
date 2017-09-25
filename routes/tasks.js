module.exports = app => {
    const Tasks = app.db.models.Tasks;
    
    app.route("/tasks")
        .all((req, res, next) => {
            //Middleware de pré-execução das rotas
            delete req.body.id;
            next();
        })
        .get((req, res) => {
            // "/tasks": Lista tarefas
            Tasks.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .post((req, res) => {
            // "/tasks": Cadastra nova tarefa
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
            });
        });

    app.route("tasks/:id")
        .all((req, res, next) => {
            //Middleware de pré-execução das rotas
            delete req.body.id;
            next();
        })
        .get((req, res) => {
            //"/tasks/{id}": Consulta uma tarefa
            Tasks.findOne({where: req.params})
                .then(result => {
                    if(result){
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .put((req, res) => {
            // "/tasks/{id}: Atualiza uma tarefa"
            Tasks.update(req.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        .delete((req, res) => {
            //"/tasks/{id}": Exclui uma tarefa
            Tasks.destroy({where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });
};