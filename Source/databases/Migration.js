import {
  addColumns,
  schemaMigrations,
} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: '_bills_com_billybook_ranuja',
          columns: [{name: 'paid_on', type: 'number', isOptional: true}],
        }),
      ],
    },
  ],
});
