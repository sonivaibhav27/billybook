const Dates = {
  name: 'PaidDate',
  embedded: true,
  properties: {
    amount: 'int',
    date: 'int',
  },
};

const Bill = {
  name: 'Billl',
  properties: {
    billName: 'string',
    billAmount: 'int',
    due: 'int',
    type: 'string',
    paidOn: 'int',
    isPaid: {type: 'bool', default: false},
    paidDates: {
      type: 'list',
      objectType: 'PaidDate',
      default: [],
    },
  },
};

// export const B = Bill;
// export const D = Dates;

export default new Realm({
  path: 'helloworld.realm',
  schema: [Bill, Dates],
  schemaVersion: 7,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 7) {
      const oldObjects = oldRealm.objects('Billl');
      const newObjects = newRealm.objects('Billl');
      for (const objIndex in oldObjects) {
        const oldObject = oldObjects[objIndex];
        const newObject = newObjects[objIndex];
      }
    }
  },
});
