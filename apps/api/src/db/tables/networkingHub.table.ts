import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class NetworkingHub extends BaseTable {
    readonly table = "networking_hub";
    columns = this.setColumns((t) => ({
        connection_id: t
            .uuid()
            .primaryKey()
            .default(t.sql`gen_random_uuid()`),
        alumni_id_1: t
            .uuid()
            .foreignKey(() => UserTable, 'id'),
        alumni_id_2: t
            .uuid()
            .foreignKey(() => UserTable, 'id'),
        connection_type: t
            .enum('connection_type', ['Professional', 'Mentorship']),
        status: t
            .enum('status', ['Pending', 'Active']),
    }))
} 