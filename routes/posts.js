const express = require('express'); //open a box of lego called express and pulling out a specific piece called express
const router = require('express').Router();// assembles the express piece into a new piece called router
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postsController'); //opening a lego box called postsController and grabbing getAllPosts, getPostById, createPost, updatePost, deletePost pieces


router.get('/', getAllPosts); //uses getAllPosts piece to handle request for retrieving all post from the new section of our structure called /
router.get('/:id', getPostById);// like above but adds a new structure called /:id for retrieving a posts by its ID
router.post('/', createPost); // same thing as the two above, adds a new structure called / to handle requests for creating a new post
router.put('/:id', updatePost); //same thing as the three above but for updating a post
router.delete('/:id', deletePost); //handle request for deleting a post

module.exports = router; //puts all the lego pieces together labeled as routes that handles requests related to posts
