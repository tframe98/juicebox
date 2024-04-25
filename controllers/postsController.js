const { PrismaClient } = require('@prisma/client'); //unpacking a box of legos called @prisma/client and taking out a specific package called PrismaClient
const prisma = new PrismaClient(); // assembling pieces from PrismaClient into a structure for the project called prisma that will allow us to interact will the database

exports.getAllPosts = async (req, res) => { //creating an instruction booklet for retrieving all posts from the database
  const posts = await prisma.post.findMany(); //prisma searches through the database to assemble pieces to gather all the posts
  res.json({posts}); 
};

exports.getPostById = async (req, res) => { //like getAllPosts but searches by it's given ID
  const postId = parseInt(req.params.id); // converts post ID from a string to an integer 
  const post = await prisma.post.findUnique({where: {id: postId}}); //prisma piece searching for posts with specific ID 
  if (!post) {
    return res.status(404).json({error: 'post not found'});
  }
  res.json({posts});
};

exports.createPost = async (req, res) => { // like creating a new lego set 
  const { title, content } = req.body; //grabbing title and content pieces from lego set
  const userId = req.user.id; //grabbing userId from th request object
  try{
    const post = await prisma.post.create({ //
      data: {title, content, userId},
    });
    res.json({post});
  } catch (error) {
    req.status(500).json({error: 'failed to create post'})
  }
};

exports.updatePost = async (req, res) => { //this brick will allow a user to modify one of their existing posts
  const postId = parseInt(req.params.id); 
  const { title, content } = req.body;
  const userId = req.user.id; 
  try{
    const post = await prisma.post.findUnique({where: {id: postId}});
    if (!post) {
      return req.status(404).json({error: 'Post not found'});
    }
    if (post.userId !== userId) {
      return res.status(403).json({error: 'not authorized to updated'});
    }
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {title, content},
    });
    res.json({post: updatedPost});
  } catch (error) {
    res.status(500).json({error: 'Failed to update post'});
  }
};

exports.deletePost = async (req, res) => { //a brick that will allow a user to delete a post
  const postId = parseInt(req.params.id);
  const userId = req.user.id;
  try {
    const post = await prisma.post.findUnique({where: {id: postId}});
    if (!post) {
      return res.status(404).json({error: 'Post not found'});
    }
    if (post.userId !== userId) {
      return res.status(403).json({error: 'not authorized to delete'});
    }
    await prisma.post.delete({where: {id: postId}}); //uses a prima brick to  delete post
    res.json({message: 'post deleted successfully'});
  } catch (error) {
    res.status(500).json({error: 'failed to delete'});
  }
};