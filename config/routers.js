module.exports = app =>{
    
    app.post('/signup', app.api.user.save)
    
    app.post('/signin', app.api.auth.signin)

    app.route('/tasks').all(app.config.passport.authenticate())
    .get(app.api.task.getTask)
    .post(app.api.task.saveTask)
    
    app.route('')
}