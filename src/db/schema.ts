import { date, integer, serial, text, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["en attente", "acceptée", "refusée"]);
export const typeEnum = pgEnum("type", ["stage", "alternance"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
});

export const candidatures = pgTable("candidatures", {
  id: integer("id").primaryKey(),
  entreprise: text("entreprise").notNull(),
  poste: text("poste").notNull(),
  type: typeEnum("type").notNull(),
  status: statusEnum("status").notNull(),
  date_offer: date("date").notNull(),
  date_candidature: date("date").notNull(),
  lien: text("lien").notNull(),
  userId: integer("users_id").notNull().references(() => users.id),
});

export type User = typeof users.$inferSelect;