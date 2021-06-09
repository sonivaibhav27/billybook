const Dates = {
  name: 'PaidDate',
  embedded: true,
  properties: {
    amount: 'int',
    date: 'date',
  },
};

const Bill = {
  name: 'Billl',
  properties: {
    billName: 'string',
    billAmount: 'int',
    due: 'int',
    type: 'string',
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
  schemaVersion: 5,
});
