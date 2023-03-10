const express = require("express");
const router = express.Router();
const { ValidationError } = require("../../utils/error-app");
const IdeaService = require("../../services/commons/service.idea");
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


//create admin 
router.post("/", async (req, res, next) => {
    try {
        const { title, desc, content, category_id, submission_id, user_id } = req.body


        if (!title || !category_id || !submission_id || !user_id)
            throw new ValidationError("Missting Text")

        const createdIdea = await ideaService.create(req.body)
        return res.json(createdIdea)
    } catch (error) {
        next(error)
    }
})


// fine One
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundIdea = await ideaService.findOne(id)
        return res.json(foundIdea)
    } catch (error) {
        next(error)
    }
})



// update 
router.patch("/:id", async (req, res, next) => {
    try {
        const { title } = req.body
        const { id } = req.params

        if (!title) throw new ValidationError("Missing Text")

        const updatedIdea = await ideaService.update(id, req.body)
        return res.json(updatedIdea)

    } catch (error) {
        next(error)
    }
})


//delete 
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params

        const deletedIdea = await ideaService.delete(id)
        return res.json(deletedIdea)
    } catch (error) {
        next(error)
    }
})

module.exports = router;