import { db } from "../db/drizzle"
import { candidatures, Candidature } from "../db/schema"
import { eq } from "drizzle-orm"

export async function getCandidatures() {
    try {
        const listofcandidatures = await db.select().from(candidatures);
        return listofcandidatures;
    } catch (error) {
        console.error(error);
        return { error: "Failed to get candidatures"};
    }
}

export async function getCandidatureById(id: number) {
    try {
        const candidature = await db.select().from(candidatures).where(eq(candidatures.id, id)).limit(1);
        return candidature[0] || null;
    } catch (error) {
        console.error(error);
        return { error: "Failed to get candidature"};
    }
}

export async function createCandidature(candidature: Omit<Candidature, 'id' | 'createdAt'>) {
    try {
        await db.insert(candidatures).values(candidature);
    } catch (error) {
        console.error(error);
        return { error: "Failed to create candidature"};
    }
}

export async function updateCandidature(candidature: Omit<Candidature, 'createdAt'>) {
    try {
        await db.update(candidatures).set(candidature).where(eq(candidatures.id, candidature.id));
    } catch (error) {
        console.error(error);
        return { error: "Failed to update candidature"};
    }
}

export async function deleteCandidature(id: number) {
    try {
        await db.delete(candidatures).where(eq(candidatures.id, id));
        return { message: "Candidature deleted successfully" };
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete candidature"};
    }
}