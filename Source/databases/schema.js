import {appSchema, tableSchema} from '@nozbe/watermelondb/Schema';

export default appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: '_bills_com_billybook_ranuja',
      columns: [
        {name: '_bill_name', type: 'string'},
        {name: '_bill_amount', type: 'number'},
        {name: 'is_paid', type: 'boolean', isIndexed: true},
        {name: 'is_half_paid', type: 'boolean'},
        {name: '_notification_id', type: 'number'},
        {name: '_due_date', type: 'number', isIndexed: true},
        {name: '_remark', type: 'string', isOptional: true},
        {name: 'type', type: 'string'},
        {name: 'paid_on', type: 'number', isOptional: true},
      ],
    }),
    tableSchema({
      name: '_half_paid_dates',
      columns: [
        {name: 'interval_date', type: 'number'},
        {name: 'interval_amount', type: 'number'},
        {name: 'bill_id', type: 'string'},
      ],
    }),
  ],
});
