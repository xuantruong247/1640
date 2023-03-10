const Idea = require("../../models/idea");
const { BadRequestError, NotFoundError } = require("../../utils/error-app");

const CategoryService = require("../../services/commons/service.category");
const categoryService = new CategoryService();

const UserService = require("../../services/commons/service.user")
const userService = new UserService()

const SubmissionService = require("../../services/commons/service.submission");
const submissionService = new SubmissionService();

class IdeaService {

    // find all
    async find() {
        const ideas = await Idea.find()
        return ideas
    }

    //create
    async create(user, data) {
        const { title, desc, content, category_id, submission_id } = data
        const {username} = user

        if (await Idea.findOne({ title })) throw new BadRequestError("Title existed")

        const foundCategory = await categoryService.findOne(category_id)

        const foundSubmission = await submissionService.findOne(submission_id)

        //can truyen vao 1 cai object
        const foundUser = await userService.findOne({username})

        const newIdea = new Idea({
            title,
            desc,
            content,
            category: {
                id: foundCategory._id,
                name: foundCategory.name
            },
            submission: {
                id: foundSubmission._id,
                name: foundSubmission.name
            },
            author: {
                id: foundUser._id,
                username: foundUser.name,
                profile: foundUser.profile
            },
        })

        console.log(newIdea);
        const createIdea = await newIdea.save();
        return createIdea;
    }

    //fine One 
    async findOne(id) {
        const foundIdea = await Idea.findOne(id)
        if (!foundIdea) throw NotFoundError("Not found idea")
        return foundIdea
    }



    //update 
    async update(id, idea) {
        if (!(await Idea.findById(id)))
            throw new BadRequestError("Idea not existed")

        const updatedIdea = await Idea.findByIdAndUpdate(id, idea, { new: true })
        return updatedIdea
    }

    //delete 
    async delete(id) {
        if (!(await Idea.findById(id)))
            throw new BadRequestError("Idea not existed")
        const deletedidea = await Idea.findByIdAndRemove(id)
        return deletedidea
    }

}

module.exports = IdeaService;