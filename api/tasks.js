const moment = require('moment')


module.exports = app => {

    const getTasks = (req, res) => {
        console.log(`Id do usuario que fez getTasks: ${req.user.id}`)
        console.log(`data fornecida ${req.body.date}`)
        const date = req.body.date ? req.body.date : moment().endOf('day').toDate()
        console.log(`data pesquisada ${date}`)
        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks => { console.log(`peguei os dados segue = ${tasks}`); res.status(200).json(tasks)})
            .catch(err => {console.log(err) ;res.status(500).json(err)})
    }

    const save = (req, res) => {
        console.log(req.body)
        console.log(`Id do usuario que fez saveTasks: ${req.user.id}`)
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é obrigatório')
        }
        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_ =>{console.log('dados foram salvos'); res.status(200).send()})
            .catch(err => {console.log(err); res.status(400).json(err)})
    }

    const remove = (req, res) => {

        console.log(`Id do usuario que fez remove: ${req.user.id}`)
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowDel => {
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

        console.log(`Id do usuario que fez updateTask: ${req.user.id}`)
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(200).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {

        console.log(`Id do usuario que fez toggleTask: ${req.user.id}`)

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


