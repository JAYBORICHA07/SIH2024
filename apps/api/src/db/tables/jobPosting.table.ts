import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { AlumniProfileTable } from "./alumniProfile.table";

export class JobPostingsTable extends BaseTable {
  readonly table = "job_postings";
  columns = this.setColumns((t) => ({
    job_id: t
      .uuid()
      .primaryKey()
      .default(t.sql`gen_random_uuid()`),
    posted_by: t
      .uuid()
      .foreignKey(() => AlumniProfileTable, 'alumni_id'), 
    job_title: t.string().trim(),
    company_name: t.string().trim(),
    location: t.string().trim(),
    description: t.text(),
    salary_range: t.string().trim(),
    job_type: t.string().trim(),
    application_url: t.string().nullable(),
    created_at: t.timestamp(),
  }));
}

export type JobPosting = Selectable<JobPostingsTable>;
export type JobPostingUpdate = Updatable<JobPostingsTable>;
export type JobPostingForQuery = Queryable<JobPostingsTable>;
