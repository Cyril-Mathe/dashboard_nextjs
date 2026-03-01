import { date, integer, text, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["en attente", "acceptée", "refusée"]);
export const typeEnum = pgEnum("type", ["stage", "alternance"]);

export const user = pgTable("user", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
});

export const candidature = pgTable("candidature", {
  id: integer("id").primaryKey(),
  entreprise: text("entreprise").notNull(),
  poste: text("poste").notNull(),
  type: typeEnum("type").notNull(),
  status: statusEnum("status").notNull(),
  date_offer: date("date").notNull(),
  date_candidature: date("date").notNull(),
  lien: text("lien").notNull(),
  userId: integer("user_id").notNull().references(() => user.id),
});