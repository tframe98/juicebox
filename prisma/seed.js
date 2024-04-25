const { PrismaClient } = require('@prisma/client'); //opens box of legos called @prisma/client and grabs a piece PrismaCLient
const prisma = new PrismaClient(); //in order to interact with the database we need to build a new structure called prisma 

async function main() { //builds another lego structure which will contain different users and their post in substructures 
  const user1 = await prisma.user.create({ //substructure built inside the main structure containing a singular users info 
    data: {
      username: 'tyler',
      password: 'root',
      posts: {
        create: [
          {title: 'Juice', content: 'Content for post 1'},
          {title: 'Juice', content: 'Content for post 2'},
          {title: 'Juice', content: 'Content for post 3'},
        ],
      },
    },
  });

  const user2 = await prisma.user.create({ //same thing as user1
    data: {
      username: 'matt',
      password: 'root',
      posts: {
        create: [
          {title: 'Juice', content: 'Content for post 1'},
          {title: 'Juice', content: 'Content for post 2'},
          {title: 'Juice', content: 'Content for post 3'},
        ],
      },
    },
  });

  const user3 = await prisma.user.create({ //same thing as user 1 and user2
    data: {
      username: 'DJ',
      password: 'root',
      posts: {
        create: [
          {title: 'Juice', content: 'Content for post 1'},
          {title: 'Juice', content: 'Content for post 2'},
          {title: 'Juice', content: 'Content for post 3'},
        ],
      },
    },
  });

}

main().catch((e) => { //connects all the substructures together to complete the lego structure
  console.error(e); //will identify a brick that does fit correctly and highlights it 
  process.exit(1); //stops the construction process 
})
.finally(async()=>{ //cleans the construction area 
  await prisma.$disconnect(); //disassembling the prisma piece and putting it away
});

