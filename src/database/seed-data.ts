
interface SeedData {
    entries: SeedEntry[]
}


interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
    color: string;
}


export const seedData: SeedData = {
    entries: [
        {
            // _id: uuidv4(),
            description: 'Pendietes: Culpa est fugiat sint deserunt reprehenderit mollit esse ut ut do labore.',
            status: 'pending',
            createdAt: Date.now(),
            color: "#8b2d01a4"
        },
        {
            // _id: uuidv4(),
            description: 'En progreso: Et nostrud Lorem amet voluptate velit occaecat ipsum.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
            color: "#2300fb59"

        },
        {
            // _id: uuidv4(),
            description: 'Terminada: Pariatur sunt nostrud nostrud elit non quis fugiat voluptate consequat.',
            status: 'finished',
            createdAt: Date.now() - 10000,
            color: "#00800075"
        }
    ]
}