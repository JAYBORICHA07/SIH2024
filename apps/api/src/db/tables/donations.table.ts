import { Queryable, Selectable, Updatable } from "orchid-orm";
import { AlumniProfileTable } from "./alumniProfile.table";
import { BaseTable } from "./baseTable";
import { ProjectsTable } from "./project.table";
import { PaymentTransactionsTable } from "./paymentTransactions.table";

export class DonationsTable extends BaseTable {
    readonly table = "donations";
    columns = this.setColumns((t) => ({
        donation_id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
        project_id: t.uuid().foreignKey(() => ProjectsTable, 'project_id'),
        payment_id: t.uuid().foreignKey(() => PaymentTransactionsTable, 'transaction_id'),
        donator: t.uuid().foreignKey(() => AlumniProfileTable, 'alumni_id'),
        amount: t.decimal(),
        donation_type: t.enum('donation_type', ['One-time', 'Recurring']),
        frequency: t.enum('frequency', ['Monthly', 'Quarterly', 'Yearly']),
        donation_date: t.timestamp(),
        receipt_url: t.string().nullable()    
    }))
}

export type Donation = Selectable<DonationsTable>;
export type DonationUpdate = Updatable<DonationsTable>;
export type DonationForQuery = Queryable<DonationsTable>;