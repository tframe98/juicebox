const bcrypt = require('bcrypt'); //imports a special type of lego break that securely hashes passwords
const jwt = require('jsonwebtoken'); //imports a special type of block that for creating authentication tokens
const {PrismaClient} = require('@prisma/client'); //like unpacking a big box of legos that contains pieces to build database interactions
const prisma = new PrismaClient(); //assembles pieces from PrismaClient box into an structure called prisma which will interact with my database

exports.createUser = async (req, res) => { //creates an instruction booklet for building a specific part of the application
  console.log(req.body); //inspects of specific lego piece's content of req.body which contains data about the new user trying to be created
  const { username, password} = req.body; //sorts out specific lego pieces from a pile, we're extracting username and password from req.body to use in the creation process
  if (!username || !password) { //checks to make sure every lego pieces are there before building
    //console.error('there is an error here creating a new user');
    return res.status(400).json({error: 'username and password are required'});
  }

  const saltRounds = 10; //this brick randomizes our hash brick, salt rounds dictates how many times we perform a hashing process
  try{
  const hashedPassword = await bcrypt.hash(password, saltRounds); //combining lego bricks bcrypt and saltRounds to hash the password
  const user = await prisma.user.create({ //prima instance is used to interact with the database to assemble a new user
    data: {username, password: hashedPassword}, 
  });
  res.json({user});
} catch (error) {
  console.error('there is an error in in createUser:', error);
  res.status(500).json({error: 'failed to create user'});
}
};

exports.loginUser = async (req, res) => { //creates an instruction booklet for logging in a user
  const {username, password} = req.body; 
  const user = await prisma.user.findUnique({ where: {username}}); //searches through lego collection find a specific piece, prisma is trying to find a user with a specific username in the database
  if (!user || !await bcrypt.compare(password, user.password)) { //checking if the pieces fit together
    return res.status(401).json({error: 'Unauthorized'});
  }
  const token = jwt.sign({ userId: user.id}, '6fad846722d1db5791a9ba7fe689bd3bedce3f2dd873c4413f8bb63e2aa08f2a'); //jsonwebtoken assembles legos to create a token that represents the user's token
  res.json({token}); //like packing a completed lego set to show off 
};