import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class ProjectsTable extends BaseTable {
  readonly table = "projects";
  columns = this.setColumns((t) => ({
    project_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    project_name: t.string().trim(),
    description: t.text(),
    target_amount: t.decimal(),
    amount_raised: t.decimal().default(0),
    start_date: t.date(),
    end_date: t.date(),
    project_type: t.enum('project_type', ['Scholarship', 'Research', 'Infrastructure']),
    created_by: t.uuid().foreignKey(() => UserTable, 'id'),
    alumni_donors: t.integer().default(0),
  }));
}

export type Project = Selectable<ProjectsTable>;
export type ProjectUpdate = Updatable<ProjectsTable>;
export type ProjectForQuery = Queryable<ProjectsTable>;