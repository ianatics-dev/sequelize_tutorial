const e = require('express')
const express = require('express')


const { sequelize , user, Post} = require('./models')
// const post = require('./models/post')

const app = express()

app.use(express.json())

app.post('/users', async(req, res) => {
    const { name, email, role } = req.body

    try{
        const created_user = await user.create({ name, email, role })

        return res.json(created_user)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/users', async(req, res) =>{
    try{
        const get_user = await user.findAll()
        return res.json(get_user)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.get('/users/:uuid', async(req, res) =>{
    const uuid = req.params.uuid
    try{
        const get_user = await user.findOne({
            where: { uuid },
            include: 'posts'
        })
        return res.json(get_user)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.delete('/users/:uuid', async(req, res) =>{
    const uuid = req.params.uuid
    try{
        const get_user = await user.findOne({
            where: { uuid }
        })
        await get_user.destroy()
        return res.json({message: 'User Deleted'})
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.put('/users/:uuid', async(req, res) =>{
    const { name, email, role } = req.body
    const uuid = req.params.uuid
    try{
        const get_user = await user.findOne({
            where: { uuid }
        })
        get_user.name = name
        get_user.email = email
        get_user.role = role

        await get_user.save() 

        return res.json(get_user)
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.post('/posts', async(req, res) => {
    const {userUuid, body} = req.body
    try{
        const get_user = await user.findOne({where: { uuid: userUuid }})
        const post = await Post.create({body, userId: get_user.id})
        return res.json(post)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/posts', async(req, res) => {
    try{
        const post = await Post.findAll({include: [user]})
        return res.json(post)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

app.listen({ port:3000 }, async () => {
    console.log('Server up on http://localhost:3000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})