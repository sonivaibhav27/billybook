// import {Model, Q} from '@nozbe/watermelondb';
// import {field, children, lazy} from '@nozbe/watermelondb/decorators';
// import action from '@nozbe/watermelondb/decorators/action';
// import date from '@nozbe/watermelondb/decorators/date';
// // import children from "@nozbe/watermelondb/decorators/children";
// export default class BillModel extends Model {
//   static table = '_bills_com_billybook_ranuja';
//   static associations = {
//     _half_paid_dates: {
//       type: 'has_many',
//       foriegnKey: 'bill_id',
//     },
//   };
// @field('_bill_name') billName;
// @field('_bill_amount') billAmount;
// @field('_due_date') dueDate;
// @field('is_paid') isPaid;
// @field('is_half_paid') isHalfPaid;
// @field('_notification_id') notificationId;
// @field('_remark') remark;
// @field('type') type;
// @field('paid_on') paidOn;
// @children('_half_paid_dates') halfPaidDates;

// @lazy getPaidDates = this.collections
//   .get('_half_paid_dates')
//   .query(Q.where('bill_id', this.id));
// }
