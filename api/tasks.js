const moment = require('moment')


module.exports = app => {

    const getTasks = (req, res) => {
        const date = req.body.date ? req.body.date : moment().endOf().toDate()
        app.db('tasks')
            .where({ userId: req.body.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks => res.status(200).json(tasks))
            .catch(err => res.status(500).json(err))
    }


    const save = (req, res) => {
        console.log(req.body)
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é obrigatório')
        }
        req.body.userId = req.userId

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(200).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .the(rowDel => {
                if (rowDel > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi possível encontrar a task com o id: ${req.params.id}`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTask = (req, res, doneAt) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(200).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {

        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não foi encontrada`
                    return res.status(400).send(msg)
                }
                const doneAt = task.doneAt ? null : new Date()
                updateTask(req, res, doneAt)
            })
            .catch(err => res.status(400).json(err))
    }

    return { getTasks, save, remove, toggleTask }
}


