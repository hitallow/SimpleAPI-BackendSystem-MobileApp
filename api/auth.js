const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bycrypt = require('bcrypt-nodejs')


module.exports = app => {
    const signin = async (req, resp) => {
        if (!req.body.email || !req.body.password) {
            return resp.status(400).send("Dados inválidos")
        }
        const user = await app.db('users').where({ email: req.body.email }).first()


        if (user) {
            bycrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (!isMatch || err) {
                    return resp.status(400).send('Senha inválida')
                }
                const payload = { id: user.id }

                resp.json({
                    name: user.name,
                    email: user.name,
                    token : jwt.encode(payload , authSecret)
                })

            })
        } else {
            return resp.status(400).send('Usuário não encontrado')
        }

    }
    return { signin }
}
