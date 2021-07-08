import moment from 'moment';
import {NativeModules} from 'react-native';
import {getAllDataFromRealm} from '../databases/realm.helper';
import BillSchema from '../DB/NewSch';

const nativeModule = NativeModules.MoneyFormat;
export default () => {
  const data = getAllDataFromRealm(BillSchema);
  const header = `BillName,BillAmount,Due\n`;

  const dates = data.map(bill => {
    return moment(bill.due, 'YYYYMMDD').format('DD/MM/YYYY');
  });
  let datastring: string = data
    .map(
      (item, index) => `${item.billName},${item.billAmount},${dates[index]}\n`,
    )
    .join('');
  const csvstring = `${header}${datastring}`;
  // const path = RNFetchBlob.fs.dirs.DownloadDir + '/data2.csv';
  // RNFetchBlob.fs
  //   .writeFile(path, csvstring, 'utf8')
  //   .then(() => {
  //     //   callback()
  //     console.log('Done Save');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  nativeModule
    .saveCSVFile('ram.csv', csvstring)
    .then(value => {
      alert(value);
    })
    .catch(err => {
      alert(err);
    });
};
