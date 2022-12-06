const seedUser = [
    {
      name: 'Ben',
      email: 'ben@email.com',
    },
    {
      name: 'Jessica',
      email: 'jessica@email.com',
    },
  ]
  
  const seedBoard = [
    {
      type: 'Soft',
      description: "Light & Fluffy",
      rating: 3
    },
    {
        type: 'Hard',
        description: "Carveable",
        rating: 4
    },
    {
        type: 'Goat',
        description: "Cheese From Goat's Milk",
        rating: 4.5
    },
    {
        type: "Cow",
        description: "Cheese From Cow's Milk",
        rating: 3.5
    }
  ]
  
  const seedCheese = [
    {
      title: "Rubing",
      description: "Hard French Goat Cheese"
    },
    {
      title: "Kesong Puti",
      description: "Soft Fillipino Goat Cheese"
    },
    {
        title: "Anari",
        description: "Soft Greek Goat Cheese"
    },
    {
        title: "Cheddar",
        description: "Hard English Cow Cheese"
    },
    {
        title: "Limburger",
        description: "Soft Belgian Cow Cheese"
    }
  ]
  
  module.exports = {
    seedUser,
    seedBoard,
    seedCheese,
  };
  