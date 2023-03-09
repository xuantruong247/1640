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
    async create(idea) {
        const { title, desc, content, category_id, user_id, submission_id } = idea

        if (await Idea.findOne({ title })) throw new BadRequestError("Title existed")

        const foundCategory = await categoryService.findOne(category_id)

        const foundUser = await userService.findOne(user_id)

        const foundSubmission = await submissionService.findOne(submission_id)

        const newIdea = new Idea({
            title,
            desc,
            content,
            category: {
                id: foundCategory._id,
                name: foundCategory.name
            },
            user: {
                id: foundUser._id,
                author: {
                    username,
                },
                profile: {
                    first_name,
                    last_name,
                    email,
                    phone,
                    avatar_path
                }
            },
            submission: {
                id: foundSubmission._id,
                name: foundSubmission.name
            }
        })

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