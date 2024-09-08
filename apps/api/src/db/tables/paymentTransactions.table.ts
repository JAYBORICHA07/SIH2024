import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";
import { UserTable } from "./user.table";

export class PaymentTransactionsTable extends BaseTable {
    readonly table = "payment_transactions";
    columns = this.setColumns((t) => ({
        transaction_id: t
            .uuid()
            .primaryKey().default(t.sql`gen_random_uuid()`),
        alumni_id: t
            .uuid()
            .foreignKey(() => UserTable, 'id'),
        amount: t.decimal(10, 2),
        payment_method: t.enum('payment_method', ['Credit Card', 'UPI', 'Bank Transfer']),
        payment_status: t.enum('payment_status', ['Pending', 'Completed', 'Failed']),
        transaction_date: t.timestamp(),
    }));
}

export type PaymentTransaction = Selectable<PaymentTransactionsTable>;
export type PaymentTransactionUpdate = Updatable<PaymentTransactionsTable>;
export type PaymentTransactionForQuery = Queryable<PaymentTransactionsTable>;
