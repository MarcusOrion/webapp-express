import prisma from '../libs/prismaClient.js'

async function main() {
    console.log('Seeder started')
    // Rimozione eventuali dati esistenti
    await prisma.videogame.deleteMany()
    await prisma.category.deleteMany()
    // Creazione categorie
    const categoryName = [ 'Action',
  'Adventure',
  'RPG',
  'Shooter',
  'Strategy',
  'Simulation',
  'Racing',
  'Sports',
  'Horror',
  'Platform']
        await prisma.category.createMany({ 
            data: categoryName.map(category => ({
                name: category,
            }))
        })

    // Lettura delle categorie appena create
    const categories = await prisma.category.findMany()
    console.log(categories)
    // Creazione videogiochi
    const videogames = []
    for (let index = 0; index < 10; index++) {
        videogames.push({
            title: `Videogame ${index + 1}`,
            description: `Description for videogame ${index + 1}`,
            rating: 7.5,
            categoryId: categories[Math.floor(Math.random() * categories.length)].id
        })
    }
    await prisma.videogame.createMany({
        data: videogames,
    })
}

main().catch((e) => {
    console.log(e);
    process.exit(1)
}).finally(() => prisma.$disconnect())