const express = require("express");
const router = express.Router();
const UserServer = require("../../services/admin/service.admin.user");
const { ValidationError } = require("../../utils/error-app");
const userServer = new UserServer();

//Find all
router.get("/", async(req, res, next) => {
    try {
        const users = await userServer.find();
        return res.json(users);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//Create User
router.post("/", async(req, res, next) => {
    try {
        const { username, password, first_name, last_name, role_id } = req.body;

        if (!username || !password) throw new ValidationError("Missing Text");

        const createdUser = await userServer.create(req.body);
        return res.json(createdUser);
    } catch (err) {
        next(err);
    }
});

//Fine One
router.get("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;

        const foundUser = await userServer.findOne(id);
        return res.json(foundUser);
    } catch (err) {
        next(err);
    }
});

//Update
router.patch("/:id", async(req, res, next) => {
    try {
        const { password } = req.body;
        const { id } = req.params;

        if (!password) throw new ValidationError("Missing Text");

        const updatedUser = await userServer.update(id, req.body);

        return res.json(updatedUser);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async(req, res, next) => {
    try {
        const { id } = req.params;


        const deletedUser = await userServer.delete(id);
        return res.json(deletedUser);
    } catch (err) {
        next(err);
    }
});

module.exports = router;