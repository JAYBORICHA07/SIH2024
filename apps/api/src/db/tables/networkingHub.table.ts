import { AlumniProfileTable } from "./alumniProfile.table";
import { BaseTable } from "./baseTable";

export class NetworkingHub extends BaseTable {
    readonly table = "networking_hub";
    columns = this.setColumns((t) => ({
        connection_id: t
            .uuid()
            .primaryKey()
            .default(t.sql`gen_random_uuid()`),
        alumni_id_1: t
            .uuid()
            .foreignKey(() => AlumniProfileTable, 'alumni_id'),
        alumni_id_2: t
            .uuid()
            .foreignKey(() => AlumniProfileTable, 'alumni_id'),
        connection_type: t
            .enum('connection_type', ['Professional', 'Mentorship']),
        status: t
            .enum('status', ['Pending', 'Active']),
    }))
} 