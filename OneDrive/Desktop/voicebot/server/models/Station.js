// Station Model
export class Station {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.location = data.location; // { lat, lng }
    this.batteries = data.batteries;
    this.status = data.status; // 'operational', 'maintenance', 'closed'
    this.operatingHours = data.operatingHours || '6:00 AM - 11:00 PM';
    this.phone = data.phone || '';
  }

  static fromDB(dbStation) {
    return new Station(dbStation);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      batteries: this.batteries,
      status: this.status,
      operatingHours: this.operatingHours,
      phone: this.phone,
    };
  }
}
