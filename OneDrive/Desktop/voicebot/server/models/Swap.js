// Swap Model
export class Swap {
  constructor(data) {
    this.id = data.id;
    this.driverId = data.driverId;
    this.swapDate = data.swapDate;
    this.amount = data.amount;
    this.status = data.status; // 'completed', 'pending', 'cancelled'
    this.batteryId = data.batteryId || null;
    this.stationId = data.stationId || null;
  }

  static fromDB(dbSwap) {
    return new Swap(dbSwap);
  }

  toJSON() {
    return {
      id: this.id,
      driverId: this.driverId,
      swapDate: this.swapDate,
      amount: this.amount,
      status: this.status,
    };
  }
}
