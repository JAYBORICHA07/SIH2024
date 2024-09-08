import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class NetworkingHub extends BaseTable {
    readonly table = "networking_hub";
    columns = this.setColumns((t) => ({
        connectionId: t
            .uuid()
            .primaryKey()
            .default(t.sql`gen_random_uuid()`),
        alumniId1: t
            .uuid()
            .foreignKey(() => UserTable, 'id'),
        alumniId2: t
            .uuid()
            .foreignKey(() => UserTable, 'id'),
        connectionType: t
            .enum('connection_type', ['Professional', 'Mentorship']),
        status: t
            .enum('status', ['Pending', 'Active']),
    }))
} 