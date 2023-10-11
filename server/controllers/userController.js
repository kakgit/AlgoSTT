const mdlUsers = require('../models/UsersModel');
const mongoose = require('mongoose');

const genMsg = {dispMsg: "Test", MsgStyle: "danger"};
//GET
//HomePage working with no pagination

// exports.fnHomePage = async (req, res) => {

//     genMsg.dispMsg = "";
//     genMsg.MsgStyle = "secondary";

//     try {
//         const objUsers = await mdlUsers.find({}).limit(5);
//         res.render('index.ejs', { genMsg, objUsers });
//     } catch (error) {
//         console.log(error);
//     } 
// }

//Updates Messages for all the pages
function fnUpdateMessages(pDispMsg, pMsgStyle)
{
    genMsg.dispMsg = pDispMsg;
    genMsg.MsgStyle = pMsgStyle;

    return;
}

async function fnRenderUsersPage(req, res)
{
    let perPage = 3;
    let page = req.query.page || 1;

    try {
        const objUsers = await mdlUsers.aggregate([{ $sort: {updatedAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await mdlUsers.count();

        res.render('index.ejs', { genMsg, objUsers, current: page, pages: Math.ceil(count / perPage) });

    } catch (error) {
        console.log(error);
    }

    return;
}

exports.fnHomePage = async (req, res) => {
    await fnUpdateMessages("", "secondary");
    
    await fnRenderUsersPage(req, res);
}

//GET
//Add New User Page
exports.fnAddNewUser = async (req, res) => {
    // genMsg.dispMsg = "Please Add New User Details";
    // genMsg.MsgStyle = "info";
    await fnUpdateMessages("Please Add New User Details", "info");

    res.render('user/addNewUserPage.ejs', { genMsg });
}

//POST
//Create New User Details in DB
exports.fnSaveUserDetails = async (req, res) => {
    const newUser = new mdlUsers({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        eMailId: req.body.eMailId,
        userDetails: req.body.userDetails        
    });

    try {
        await mdlUsers.create(newUser);

        await fnUpdateMessages("User Details Added Successfully!", "success");

        await fnRenderUsersPage(req, res);
    } catch (error) {
        await fnUpdateMessages(`Error! $${error}`, "danger");

        res.render('user/addNewUserPage.ejs', { genMsg });
    }
}

//POST
//Create New Multiple Users using InsertMany for DB
exports.fnInsSmplManyUserDetails = async (req, res) => {

    try {
        await mdlUsers.insertMany([
            {
            firstName: "aaaaaaa",
            lastName: "AAAAAAA",
            phoneNumber: "111111",
            eMailId: "aaaaaa@aaaaa.com",
            userDetails: "aaaa details",
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            firstName: "bbbbbbb",
            lastName: "BBBBBBB",
            phoneNumber: "222222222",
            eMailId: "bbbbbbb@bbbbb.com",
            userDetails: "bbbbb details",
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            firstName: "ccccc",
            lastName: "CCCCCCC",
            phoneNumber: "33333333",
            eMailId: "cccccc@ccc.com",
            userDetails: "",
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            firstName: "ddd",
            lastName: "DDDD",
            phoneNumber: "44444",
            eMailId: "dddd@dddd.com",
            userDetails: "ddd details",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        ]);

        await fnUpdateMessages("Sample User Details Data Added to DB Successfully!", "warning");

        await fnRenderUsersPage(req, res);
    } catch (error) {
        console.log(error);

        await fnUpdateMessages(`Error! $${error}`, "danger");
        res.render('user/addNewUserPage.ejs', { genMsg });
    }
}

exports.fnViewUserDetails = async (req, res) => {

    try {
        const objUsers = await mdlUsers.findOne({ _id: req.params.id });

        res.render('user/viewUsers.ejs', { objUsers });
    } catch (error) {
        console.log(error);
        await fnUpdateMessages(`Error! $${error}`, "danger");

        await fnRenderUsersPage(req, res);
    }
}

exports.fnEditUserDetails = async (req, res) => {

    try {
        await fnUpdateMessages("Please Update the Below Details", "info");

        const objUsers = await mdlUsers.findOne({ _id: req.params.id });

        res.render('user/editUser.ejs', { genMsg, objUsers });
    } catch (error) {
        console.log(error);
        await fnUpdateMessages(`Error! $${error}`, "danger");

        await fnRenderUsersPage(req, res);
    }
}

exports.fnUpdateUserDetails = async (req, res) => {
    try {
        await mdlUsers.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            eMailId: req.body.eMailId,
            userDetails: req.body.userDetails,
            updatedAt: Date.now()
        });
        await fnUpdateMessages("User Details Updated Successfully!", "success");

        await fnRenderUsersPage(req, res);
    } catch (error) {
        console.log(error);
        await fnUpdateMessages(`Error! $${error}`, "danger");

        res.render('user/editUser.ejs', { genMsg });

    }
}

exports.fnDeleteUserDetails = async (req, res) => {
    try {
        await mdlUsers.findByIdAndDelete(req.params.id);
        await fnUpdateMessages("User Details Deleted Successfully!", "warning");

        await fnRenderUsersPage(req, res);

    } catch (error) {
        console.log(error);
        await fnUpdateMessages(`Error! $${error}`, "danger");

        await fnRenderUsersPage(req, res);
    }
}