const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async(request, response) => {

    console.log('get Request \n')

    try{
        const users = await User.find()
        response.json(users)
    }
    catch(err)
    {
        response.send('Error ' + err)
    }

})

router.get('/:id', async(request, response) => {

    console.log('get by id Request \n')

    try{
        const user = await User.findById(request.params.id)
        response.json(user)
    }
    catch(err)
    {
        response.send('Error ' + err)
    }

})

router.post('/', async(request, response) => {

    console.log('put Request \n')

    const user = new User({
        name : request.body.name,
        email : request.body.email,
        status : request.body.status
    })

    try{

        const savedUser = await user.save()
        response.json(savedUser)

    }
    catch(err)
    {
        response.send('Error ' + err)
    }
})

router.patch('/:id', async(request, response) => {

    console.log('patch Request \n')

    

    
    try{

        // find alien for that id
        const user = await User.findById(request.params.id)
        user.status = request.body.status

        const updatedUser = await user.save()
        response.send(updatedUser)

    }
    catch(err)
    {
        response.send('Error ' + err)
    }
})

router.delete('/:id', async(request, response) => {

    console.log('delete Request \n')

    try{

        // find alien for that id
        const user = await User.findById(request.params.id)
        await user.deleteOne()

        response.send('User deleted')

    }
    catch(err)
    {
        response.send('Error ' + err)
    }
})

module.exports = router