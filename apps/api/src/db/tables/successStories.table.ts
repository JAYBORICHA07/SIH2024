import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { AlumniProfileTable } from "./alumniProfile.table";

export class SuccessStoriesTable extends BaseTable {
  readonly table = "success_stories";
  columns = this.setColumns((t) => ({
    story_id: t
        .uuid()
        .primaryKey().default(t.sql`gen_random_uuid()`),
    alumni_id: t
        .uuid()
        .foreignKey(() => AlumniProfileTable, 'alumni_id'),
    story_title: t.string().trim(),
    story_content: t.text(),
    posted_at: t.timestamp(),
  }));
}

export type SuccessStory = Selectable<SuccessStoriesTable>;
export type SuccessStoryUpdate = Updatable<SuccessStoriesTable>;
export type SuccessStoryForQuery = Queryable<SuccessStoriesTable>;
