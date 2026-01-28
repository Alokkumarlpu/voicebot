// Driver Model
export class Driver {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email || '';
    this.language = data.language || 'hi';
    this.active = data.active || true;
    this.joinedDate = data.joinedDate || new Date();
    this.metadata = data.metadata || {};
  }

  static fromDB(dbDriver) {
    return new Driver(dbDriver);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      language: this.language,
      active: this.active,
      joinedDate: this.joinedDate,
    };
  }
}
