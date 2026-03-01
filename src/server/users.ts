import { db } from "../db/drizzle"
import { users, User } from "../db/schema"
import { eq } from "drizzle-orm"

export async function getUsers() {
    try {
        const listofusers = await db.select().from(users);
        return listofusers;
    } catch (error) {
        console.error(error);
        return { error: "Failed to get users"};
    }
}

export async function getUserById(id: number) {
    try {
        const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return user[0] || null;
    } catch (error) {
        console.error(error);
        return { error: "Failed to get user"};
    }
}

export async function createUser(user: Omit<User, 'id' | 'createdAt'>) {
    try {
        await db.insert(users).values(user);
    } catch (error) {
        console.error(error);
        return { error: "Failed to create user"};
    }
}

export async function updateUser(user: Omit<User, 'createdAt'>) {
    try {
        await db.update(users).set(user).where(eq(users.id, user.id));
    } catch (error) {
        console.error(error);
        return { error: "Failed to update user"};
    }
}

export async function deleteUser(id: number) {
    try {
        await db.delete(users).where(eq(users.id, id));
        return { message: "User deleted successfully" };
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete user"};
    }
}