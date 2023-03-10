const express = require("express");
const router = express.Router();
const { ValidationError } = require("../../utils/error-app");
const IdeaService = require("../../services/commons/service.idea");
const { verifyToken } = require("../../middlewares/auth");
const ideaService = new IdeaService();


//find all 
router.get("/", async (req, res, next) => {
    try {
        const ideas = await ideaService.find()
        return res.json(ideas)
    } catch (error) {
        next(error)
    }
})


//create
router.post("/", verifyToken, async (req, res, next) => {
    try {
        const { title, desc, content, category_id, submission_id, user_id } = req.body


        if (!title || !category_id || !submission_id)
            throw new ValidationError("Missting Text")

        const createdIdea = await ideaService.create(req.user, req.body)
        return res.json(createdIdea)
    } catch (error) {
        next(error)
    }
})

module.exports = router;