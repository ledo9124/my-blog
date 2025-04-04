import dbConnect from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

interface FakeUser {
    username: string;
    email: string;
    password: string;
}

const generateFakeUsers = (count: number): FakeUser[] => {
    const users: FakeUser[] = [];

    for (let i = 0; i < count; i++) {
        const username = `user${i + 1}`;
        const email = `user${i + 1}@example.com`;
        const password = `password${i + 1}`;

        users.push({
            username,
            email,
            password,
        });
    }

    return users;
};

export async function seedUsers(count: number = 10) {
    try {
        await dbConnect();

        // Clear existing users
        await User.deleteMany({});

        // Generate fake users
        const fakeUsers = generateFakeUsers(count);

        // Hash passwords and create users
        const hashedUsers = await Promise.all(
            fakeUsers.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
            }))
        );

        // Insert users into database
        const createdUsers = await User.insertMany(hashedUsers);

        console.log(`Successfully seeded ${count} users`);
        return createdUsers;
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
} 