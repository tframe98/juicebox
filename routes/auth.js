const express = require('express'); //open a lego box labeled express  and takes out a specific piece called express
const router = require('express').Router(); //assembles the express piece into a new piece called router that helps organizes the project's routes
const { createUser, loginUser } = require('../controllers/authController'); //takes out two pieces called createUser and loginUser from a lego box called authController

router.post('/register', createUser); //uses createUser  piece to handle the new section /register
router.post('/login', loginUser);

module.exports = router; //puts all the pieces together to create a structure called router to handle requests