// Subscription Model
export class Subscription {
  constructor(data) {
    this.id = data.id;
    this.driverId = data.driverId;
    this.planName = data.planName;
    this.validTill = data.validTill;
    this.price = data.price;
    this.features = data.features || [];
    this.status = data.status || 'active'; // 'active', 'expired', 'cancelled'
  }

  isValid() {
    return new Date(this.validTill) > new Date();
  }

  daysUntilExpiry() {
    const now = new Date();
    const expiry = new Date(this.validTill);
    return Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  }

  static fromDB(dbSubscription) {
    return new Subscription(dbSubscription);
  }

  toJSON() {
    return {
      id: this.id,
      driverId: this.driverId,
      planName: this.planName,
      validTill: this.validTill,
      price: this.price,
      features: this.features,
      status: this.status,
      daysUntilExpiry: this.daysUntilExpiry(),
    };
  }
}
