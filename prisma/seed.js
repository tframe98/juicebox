const { PrismaClient } = require('@prisma/client'); //opens box of legos called @prisma/client and grabs a piece PrismaCLient
const prisma = new PrismaClient(); //in order to interact with the database we need to build a new structure called prisma 

async function main() { //builds another lego structure which will contain different users and their post in substructures 
  const user1 = await prisma.user.create({ //substructure built inside the main structure containing a singular users info 
    data: {
      username: 'tyler',
      password: 'root',
      posts: {
        create: [
          {title: 'Summer Berry Blast', content: 'Enjoy the fresh blend of strawberries, raspberries, and blueberries in our Summer Berry Blast'},
          {title: 'Citrus Zinger', content: 'Enjoy the fresh blend of oranges, lemons, and ginger in our Citrus Zinger'},
          {title: 'Pomegranate Perfection', content: 'Enjoy the fresh blend of pomegranates and antioxidants in our Pomegranate Perfection'},
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
          {title: 'Topical Mango Mix', content: 'Enjoy the fresh blend of mangos and pineapple and antioxidants in our Tropical Mango Mix'},
          {title: 'Apple Orchard Fresh', content: 'Enjoy the fresh blend of apples and citruses in our Apple Orchard Fresh'},
          {title: 'Berry', content: 'Enjoy the fresh blend of watermelon and mixed berries in our Berry Watermelon Wonder'},
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
          {title: 'Green Detox Delight', content: 'Enjoy the fresh blend of spinach, kale, and green apples in our Green Detox Delight'},
          {title: 'Carrot Ginger Glow', content: 'Enjoy the fresh blend of carrots and ginger twists in our Carrot Ginger Glow'},
          {title: 'Pineapple Paradise', content: 'Enjoy the fresh blend of pineapple and citrus fruits in our Pineapple Paradise'},
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

