// import {databases} from '../../index';
// import moment from 'moment';
// import {Q} from '@nozbe/watermelondb';
// export const collections = databases.collections.get(
//   '_bills_com_billybook_ranuja',
// );

// export const observers = () => {
//   const todayDate = moment().format('YYYYMMDD');
//   console.log('Today Date', todayDate);
//   console.log(moment('20210611', 'YYYYMMDD'));
//   const monthEndFromNow = moment().endOf('M').format('YYYYMMDD');
//   console.log('Month ENd From Now', monthEndFromNow);
//   return collections
//     .query(
//       Q.and(
//         Q.where('_due_date', Q.gte(Number(todayDate))),
//         Q.where('is_paid', false),
//       ),
//     )
//     .observe();
// };

// export const overdueObserves = () => {
//   const todayDate = moment().format('YYYYMMDD');
//   console.log('Today Date', todayDate);
//   console.log(moment('20210611', 'YYYYMMDD'));
//   const monthEndFromNow = moment().endOf('M').format('YYYYMMDD');
//   console.log('Month ENd From Now', monthEndFromNow);
//   return collections
//     .query(
//       Q.and(
//         Q.where('_due_date', Q.lt(Number(todayDate))),
//         Q.where('is_paid', false),
//       ),
//     )
//     .observe();
// };
// export const withoutObserverPendingBill = showAllBills => {
//   const todayDate = moment().format('YYYYMMDD');
//   if (!showAllBills) {
//     const monthEndFromNow = moment().endOf('M').format('YYYYMMDD');
//     console.log(monthEndFromNow);
//     return collections
//       .query(
//         Q.and(
//           Q.where('_due_date', Q.gte(Number(todayDate))),
//           Q.where('is_paid', false),
//           Q.where('_due_date', Q.lte(Number(monthEndFromNow))),
//         ),
//       )
//       .fetch();
//   } else {
//     console.log('Calling Here from All BILLS');
//     return collections
//       .query(
//         Q.and(
//           Q.where('_due_date', Q.gte(Number(todayDate))),
//           Q.where('is_paid', false),
//         ),
//       )
//       .fetch();
//   }
// };

// export const overdueBillCountObservers = () => {
//   const todayDate = moment().format('YYYYMMDD');
//   return collections
//     .query(
//       Q.and(
//         Q.where('_due_date', Q.lt(Number(todayDate))),
//         Q.where('is_paid', false),
//       ),
//     )
//     .observeCount(1000);
// };
// export const paidBills = () => {
//   return collections.query(Q.where('is_paid', true));
// };

// export const betweenTwoDates = (from, to = null) => {
//   const fromRefined = moment(from).format('YYYYMMDD');
//   console.log(fromRefined);
//   if (to === null) {
//     return collections.unsafeFetchRecordsWithSQL(
//       `select * from _bills_com_billybook_ranuja where _status is not 'deleted' and paid_on != 0 and paid_on = ${fromRefined} and is_paid = 1`,
//     );
//   }
//   const toRefined = moment(to).format('YYYYMMDD');
//   return collections.unsafeFetchRecordsWithSQL(
//     `select * from _bills_com_billybook_ranuja where _status is not 'deleted' and paid_on != 0 and paid_on >= ${fromRefined} and paid_on <= ${toRefined} and is_paid = 1`,
//   );
// };
// export const withoutObserverOverdueBills = () => {
//   const todayDate = moment().format('YYYYMMDD');
//   console.log(todayDate);
//   return collections
//     .query(
//       Q.and(
//         Q.where('_due_date', Q.lt(Number(todayDate))),
//         Q.where('is_paid', false),
//       ),
//     )
//     .fetch();
// };

// export const withObserveableThisMonthBill = () => {
//   const todayDate = moment().format('YYYYMMDD');
//   console.log('Today Date', todayDate);
//   console.log(moment('20210611', 'YYYYMMDD'));
//   const monthEndFromNow = moment().endOf('M').format('YYYYMMDD');
//   console.log('Month ENd From Now', monthEndFromNow);
//   return collections
//     .query(
//       Q.and(
//         Q.where('_due_date', Q.gte(Number(todayDate))),
//         Q.where('is_paid', false),
//         Q.where('_due_date', Q.lte(Number(monthEndFromNow))),
//       ),
//     )
//     .observe();
// };

// export const paidCall = (num, isOneDay) => {
//   if (typeof num != 'number') {
//     return;
//   }
//   const s = moment().subtract(num, 'd').format('YYYYMMDD');
//   console.log(s);
//   if (isOneDay) {
//     return collections.unsafeFetchRecordsWithSQL(
//       `select * from _bills_com_billybook_ranuja where _status is not 'deleted' and paid_on != 0 and paid_on = ${s} and is_paid = 1`,
//     );
//   }
//   const t = moment().format('YYYYMMDD');
//   console.log(s, '=>', t);
//   return collections.unsafeFetchRecordsWithSQL(
//     `select * from _bills_com_billybook_ranuja where _status is not 'deleted' and paid_on != 0 and paid_on >= ${s} and paid_on <= ${t} and is_paid = 1`,
//   );
// };
// export const getAllBillsForSearch = () => {
//   return collections.query(Q.where('is_paid', false)).fetch();
// };

// const dateToNumber = date => {
//   return Number(moment(date).format('YYYYMMDD'));
// };

// export const saveToDatabase = (billName, billAmount, dueDate, remark, type) => {
//   databases.action(async () => {
//     await collections.create(bill => {
//       bill.billName = billName;
//       bill.billAmount = billAmount;
//       bill.dueDate = dateToNumber(dueDate);
//       bill.isPaid = false;
//       bill.isHalfPaid = false;
//       bill.remark = remark;
//       bill.notificationId = -1;
//       bill.type = type;
//     });
//   });
// };

// export const updateIsPaid = (item, callback) => {
//   databases.action(async () => {
//     await databases.collections.get('_half_paid_dates').create(paidDate => {
//       // console.log(paidDate.bill);
//       paidDate.bill.set(item);
//       paidDate.intervalDate = Number(moment().format('YYYYMMDD'));
//       paidDate.intervalAmount = 501;
//     });
//     await item.update(bill => {
//       bill.isPaid = true;
//     });
//     callback();
//   });
// };

// export const deleteAllBillAndChildrens = () => {
//   databases.action(async () => {
//     await item.destroyPermanently();
//     await databases.collections
//       .get('_half_paid_dates')
//       .query(Q.where('bill_id', item.id))
//       .destroyAllPermanently();
//     // await d.destroyPermanently();
//   });
// };
