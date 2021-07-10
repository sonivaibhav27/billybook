import Realm from 'realm';
import moment from 'moment';
import BillSchema from '../DB/NewSch';
import {ToastAndroid} from 'react-native';

const getTodayDate = () => {
  return Number(moment().format('YYYYMMDD'));
};
export const getAllDataFromRealm = realmObject => {
  return realmObject.objects('Billl');
};
// BillSchema.objects().sorted(a,)

export const sortByDate = (billInstance, sortDescending, on = 'due') => {
  const todayDate = getTodayDate();
  const endOfYear = Number(moment().add(1, 'y').format('YYYYMMDD'));
  return getAllDataFromRealm(billInstance)
    .filtered('due >= $0 && due <= $1 && isPaid == false', todayDate, endOfYear)
    .sorted(on, sortDescending);
};

export const sortThisMonthBillByDate = (billInstance, sortDescending) => {
  const todayDate = getTodayDate();
  console.log(todayDate);
  const endOfYear = Number(moment().add(1, 'year').format('YYYYMMDD'));
  console.log('End Of Year', endOfYear);
  const monthEndFromNow = Number(moment().endOf('M').format('YYYYMMDD'));
  return getAllDataFromRealm(billInstance)
    .filtered(
      'due >= $0 && due <= $1 && due <= $2',
      todayDate,
      monthEndFromNow,
      endOfYear,
    )
    .sorted('due', sortDescending);
};

export const sortByAmount = (billInstance, sortDescending) => {
  const todayDate = getTodayDate();
  return billInstance
    .filtered('due >= $0', todayDate)
    .sorted('billAmount', sortDescending);
};

export const getOverdueBills = billInstance => {
  const todayDate = getTodayDate();
  return getAllDataFromRealm(billInstance)
    .filtered('due < $0', todayDate)
    .sorted('due');
};

export const createBillInDatabase = (
  billName,
  billAmount,
  due,
  remark,
  type,
  repeat,
  realmInstance,
) => {
  if (!billName || !billAmount || !due || !type) {
    ToastAndroid.show('Please Enter all fields', ToastAndroid.SHORT);
    return;
  }
  return new Promise((resolve, reject) => {
    realmInstance.write(() => {
      for (let i = 0; i < repeat.count; i++) {
        const bill = realmInstance.create('Billl', {
          billName,
          billAmount: Number(billAmount),
          due: Number(moment(due).add(i, 'M').format('YYYYMMDD')),
          type,
          remark,
        });
      }

      resolve();
    });
  });
};

export const OverdueBillCount = () => {
  getAllDataFromRealm(BillSchema).length;
};

export const closeDatabase = instance => {
  instance.close();
};

export const getAllBillForSearch = instance => {
  return getAllDataFromRealm(instance).filtered('isPaid  == false');
};

export const paidBills = (
  last,
  billInstance,
  groupShow = false,
  particularDate = null,
) => {
  const calcDate =
    particularDate != null
      ? particularDate
      : Number(moment().subtract(last, 'days').format('YYYYMMDD'));
  console.log('[Calc Date Paid Bills]', calcDate);
  if (groupShow) {
    return getAllDataFromRealm(billInstance).filtered(
      'paidOn >= $0 && isPaid == true',
      calcDate,
    );
  }
  return getAllDataFromRealm(billInstance).filtered(
    'paidOn == $0 && isPaid == true',
    calcDate,
  );
};

export const returnPaginatedData = (startFrom, end, data: Array) => {
  // data.map(a => {
  //   console.log(a.due);
  // });
  return data.slice(startFrom, end + 1);
};

export const payBillHelper = (item, schema, date, amount, isPaid, callback) => {
  if (item.amount < amount) return;
  const _DateToNumber = Number(moment(date, 'MMMM D,YYYY').format('YYYYMMDD'));
  schema.write(() => {
    (item.isPaid = isPaid),
      (item.paidOn = _DateToNumber),
      item.paidDates.push({
        amount,
        date: _DateToNumber,
      });
  });
  callback();
};

export const deleteBill = (item, BillSchema, callback) => {
  BillSchema.write(() => {
    BillSchema.delete(item);
  });
  callback();
};

export const betweenTwoDates = (fromDate, toDate, BillSchema) => {
  if (toDate == null) {
    return paidBills(
      0,
      BillSchema,
      false,
      Number(moment(fromDate, 'MMMM D,YYYY').format('YYYYMMDD')),
    );
  } else {
    const from = Number(moment(fromDate).format('YYYYMMDD'));
    const to = Number(moment(toDate).format('YYYYMMDD'));
    return getAllDataFromRealm(BillSchema).filtered(
      'paidOn >= $0 && paidOn <= $1 && isPaid == true',
      from,
      to,
    );
  }
};
