import { change } from '../dbScript';

change(async (db) => {
  await db.changeTable('events', (t) => ({
    event_time: t.add(t.string()),
    event_type: t.add(t.string()),
    capacity: t.add(t.string()),
    attendees: t.add(t.array(t.uuid()).nullable()),
    registrationUrl: t.drop(t.varchar(255).nullable()),
  }));
});
