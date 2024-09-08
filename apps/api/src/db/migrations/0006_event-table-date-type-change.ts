import { change } from '../dbScript';

change(async (db) => {
  await db.changeTable('events', (t) => ({
    ...t.drop(t.name('event_date').date()),
    ...t.add(t.name('event_date').string()),
  }));
});
