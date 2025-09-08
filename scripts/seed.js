import { PrismaClient } from '@prisma/client';
const database = new PrismaClient();

async function main() {
    try {
        // Create some categories
        const categories = await database.category.createMany({
            data: [
                { name: 'Mathematics' },
                { name: 'Science' },
                { name: 'History' },
                { name: 'Literature' },
                { name: 'Art' },
                { name: 'Music' },
                { name: 'Technology' },
                { name: 'Business' },
                { name: 'Health & Wellness' },
                { name: 'Personal Development' },
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