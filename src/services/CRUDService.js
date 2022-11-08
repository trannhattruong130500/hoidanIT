import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let creatNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBscrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBscrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('Create new user succeed!')
        } catch (e) {
            reject(e)
        }
    })

}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}


let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                raw: true,
                where: { id: userId }
            })
            if (user) {
                resolve(user)
            } else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    creatNewUser: creatNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}