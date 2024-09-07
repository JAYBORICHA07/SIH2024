import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { AlumniProfileTable } from "./alumniProfile.table";
import { UserTable } from "./user.table";

export class EventsTable extends BaseTable {
  readonly table = "events";
  columns = this.setColumns((t) => ({
    event_id: t
      .uuid()
      .primaryKey()
      .default(t.sql`gen_random_uuid()`),
    event_name: t.string().trim(),
    description: t.text(),
    event_date: t.date(),
    location: t.string().trim(),
    organizer_id: t
      .uuid()
      .foreignKey(() => UserTable, 'id') 
      .nullable(),
    registration_url: t.string().nullable(),
  }));
}

export type Event = Selectable<EventsTable>;
export type EventUpdate = Updatable<EventsTable>;
export type EventForQuery = Queryable<EventsTable>;