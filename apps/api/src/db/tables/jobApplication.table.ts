import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { AlumniProfileTable } from "./alumniProfile.table";
import { JobPostingsTable } from "./jobPosting.table";

export class JobApplicationTable extends BaseTable {
  readonly table = "job_application";
  columns = this.setColumns((t) => ({
    application_id: t
        .uuid()
        .primaryKey().default(t.sql`gen_random_uuid()`),
    job_id: t
        .uuid()
        .foreignKey(() => JobPostingsTable, 'job_id'),
    alumni_id: t
        .uuid()
        .foreignKey(() => AlumniProfileTable, 'alumni_id'),
    application_date: t
        .timestamp(),
    status: t
        .enum('status', ['Submitted', 'interview', 'Hired', 'Rejected']),
  }));
}

export type JobApplication = Selectable<JobApplicationTable>;
export type JobApplicationUpdate = Updatable<JobApplicationTable>;
export type JobApplicationForQuery = Queryable<JobApplicationTable>;
