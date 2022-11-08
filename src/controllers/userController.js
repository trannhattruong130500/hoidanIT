import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: "Missing inputs parameters"
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let users = await userService.getAllUsers(req.query.id)
    if (!users) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let data = await userService.createNewUser(req.body);
    if (data) {
        return res.status(200).json(data)
    }
    if (!data) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing required parameter!',
            users: []
        })
    }

}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 2,
            errMessage: 'Missing required parameter!',
        })
    }
    let data = await userService.deleteUser(req.body.id);
    return res.status(200).json(data)
}

let handleEditUser = async (req, res) => {
    if (!req.body) {
        return res.status(200).json({
            errCode: 3,
            errMessage: 'Missing required parameter!',
        })
    }
    let data = await userService.updateUser(req.body);
    return res.status(200).json(data)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}