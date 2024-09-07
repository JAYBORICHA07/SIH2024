import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class AlumniProfileTable extends BaseTable {
    readonly table = "alumni_profile";
    columns = this.setColumns((t) => ({
        alumni_id: t.uuid().foreignKey(() => UserTable, 'id').primaryKey(),
        department: t.string().trim(), 
        linkedin_profile: t.string().trim().nullable(),
        graduation_year: t.integer(),
        current_location: t.string().trim().nullable(),
        mobileNumber: t.string().trim().nullable(),
        profilePicture: t.string().nullable(),
        currCompany: t.string().trim().nullable(),
        currRole: t.string().trim().nullable(),
        collegeId: t.string().trim().nullable(),
        passoutYear: t.string().trim().nullable(),
        lastLoginAt: t.timestamp().nullable(),
        createdAt: t.timestamps().createdAt.nullable(),
        updatedAt: t.timestamps().updatedAt.nullable(),    
    }))
}