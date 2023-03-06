const User = require("../../models/user");
const { BadRequestError, NotFoundError } = require("../../utils/error-app");
const RoleService = require("../../services/admin/service.admin.role");
const roleService = new RoleService();

class UserServer {
    async find() {
        const users = await User.find();
        return users;
    }

    async findOne(id) {
        const foundUser = await User.findById(id);
        if (!foundUser) throw NotFoundError("Not found user");
        return foundUser;
    }

    async create(user) {
        const { username, password, first_name, last_name, role_id } = user;

        if (await User.findOne({ username }))
            throw new BadRequestError("User existed");

        const foundRole = await roleService.findOne(role_id);

        const newUser = new User({
            username,
            password,
            profile: {
                first_name,
                last_name,
            },
            role: {
                id: foundRole._id,
                name: foundRole.name,
            },
        });

        const createUser = await newUser.save();
        return createUser;
    }

    async update(id, user) {
        //kiem tra role neu khong ton tai thi ra loi
        if (!(await User.findById(id)))
            throw new BadRequestError("User not existed");

        const updatedUser = await User.findByIdAndUpdate(id, user, {
            new: true,
        });
        return updatedUser;
    }

    async delete(id) {
        if (!(await User.findById(id)))
            throw new BadRequestError("User not existed");
        const deletedUser = await User.findByIdAndRemove(id);
        return deletedUser;
    }
}

module.exports = UserServer;