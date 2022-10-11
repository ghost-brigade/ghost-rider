import Repository from "./Repository.js";

class UserRepository extends Repository {
    find = async (id) => {
        let user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (user === null) {
            throw new Error('User not found');
        }
        return user;
    };

    findAll = async () => {
        let users;

        users = await this.prisma.user.findMany();

        if (users === null) {
            throw new Error('Users not found');
        }
        return users;
    };

    create = async (user) => {
        let newUser = await this.prisma.user.create({
            data: user
        });

        if (newUser === null) {
            throw new Error('User not created');
        }
        return newUser;
    };
}

export default new UserRepository();
