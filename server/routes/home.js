const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

//Home router
router.get('/', userController.fnHomePage);
router.get('/addUser', userController.fnAddNewUser);
router.post('/saveUser', userController.fnSaveUserDetails);

router.get('/viewUsers/:id', userController.fnViewUserDetails);
router.get('/editUser/:id', userController.fnEditUserDetails);
router.put('/updateUser/:id', userController.fnUpdateUserDetails);
router.delete('/deleteUser/:id', userController.fnDeleteUserDetails);


module.exports = router;