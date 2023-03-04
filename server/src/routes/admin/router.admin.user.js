const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const Role = require('../../models/role')
const RoleService = require('../../services/admin/service.admin.role')
const roleService = new RoleService()

//Find all
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

//Create User
router.post('/', async (req, res, next) => {
    try{
        const {username, password, first_name, last_name, role_id} = req.body

        if(!username || !password) throw new ValidationError('Missing Text')

        //kiem tra neu khong ton tai, thi moi cho tao user
        if(await User.findOne({username})) throw new BadRequestError('User existed')

        const foundRole = await roleService.findOne(role_id)

        const user = new User({
            username,
            password,
            profile: {
                first_name,
                last_name
            },
            role: {
                id: foundRole._id,
                name: foundRole.name
            }
        })

        const createdUser = await user.save()
        return res.json(createdUser)
    } catch(err) {
        next(err)
    }
})

//Fine One 
router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params

        const foundUser = await User.findById(id)
        if(!foundUser) throw new NotFoundError('Not found user')
        return res.json(foundUser)
    } catch (err) {
        next(err)
    }
})

//Update
router.patch('/:id', async (req, res, next) => {
    try {
        const {password} = req.body
        const {id} = req.params

        if(!password) throw new ValidationError('Missing Text')

        //kiem tra role neu khong ton tai thi ra loi
        if(!await User.findById(id)) throw new BadRequestError('User not existed')

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.json(updatedUser)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params

        if(!await User.findById(id)) throw new BadRequestError('User not existed')
        const deletedUser = await User.findByIdAndRemove(req.params.id)
        return res.json(deletedUser)
    } catch (err) {
        next(err)
    }
})

module.exports = router