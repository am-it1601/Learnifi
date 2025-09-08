import { PrismaClient } from '@prisma/client';
const database = new PrismaClient();

async function main() {
    try {
        // Create some categories
        const categories = await database.category.createMany({
            data: [
                { name: 'Photography' },
                { name: 'Fitness' },
                { name: 'History' },
                { name: 'Accounting' },
                { name: 'Engineering' },
                { name: 'Music' },
            ],
            skipDuplicates: true,
        });
        console.log(`Seeded ${categories.count} categories.`);
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await database.$disconnect();
    }
}
main();