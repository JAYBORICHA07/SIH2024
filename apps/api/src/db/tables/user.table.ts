import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";

export class UserTable extends BaseTable {
  readonly table = "user";
  columns = this.setColumns((t) => ({
    id: t
      .uuid()
      .primaryKey()
      .default(t.sql`gen_random_uuid()`),
    email: t.string().trim().unique(),
    name: t.string().trim(),
    password: t.string().trim(),
    role: t.string().trim(),
    isVerified: t.boolean().default(false),
    mobileNumber: t.string().trim().nullable(),
    profilePicture: t.string().nullable(),
    currCompany: t.string().trim().nullable(),
    currRole: t.string().trim().nullable(),
    collegeId: t.string().trim().nullable(),
    passoutYear: t.string().trim().nullable(),
    department: t.string().trim().nullable(),
    lastLoginAt: t.timestamp().nullable(),
    createdAt: t.timestamps().createdAt.nullable(),
    updatedAt: t.timestamps().updatedAt.nullable(),
  }));
}

export type User = Selectable<UserTable>;
export type UserUpdate = Updatable<UserTable>;
export type UserForQuery = Queryable<UserTable>;
