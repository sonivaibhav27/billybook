export default class ParticularBillClass {
  constructor(item) {
    this.billName = item.billName;
    this.billAmount = item.billAmount;
    this.due = item.due;
    this.type = item.type;
    this.isPaid = item.isPaid;
    this.remark = item.remark;
  }
}
