export default class CouponEntity {
  constructor({
    id,
    code,
    type,
    amount,
    expires_at,
    usage_limit = 1,
    used_count = 0,
  }) {
    this.id = id;
    this.code = code;
    this.type = type;
    this.amount = amount;
    this.expires_at = expires_at;
    this.usage_limit = usage_limit;
    this.used_count = used_count;
  }

  static fromDatabase(row) {
    return new CouponEntity({
      id: row.id,
      code: row.code,
      type: row.type,
      amount: row.amount,
      expires_at: row.expires_at,
      usage_limit: row.usage_limit,
      used_count: row.used_count,
    });
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      type: this.type,
      amount: this.amount,
      expires_at: this.expires_at,
      usage_limit: this.usage_limit,
      used_count: this.used_count,
      is_expired: this.isExpired()
    };
  }

  isExpired(currentDate = new Date()) {
    return new Date(this.expires_at) < currentDate;
  }

  isUsable() {
    return this.used_count < this.usage_limit && !this.isExpired();
  }

  calculateDiscount(originalAmount) {
    if (this.type === "percent") {
      return Math.floor((this.amount / 100) * originalAmount);
    } else if (this.type === "fixed") {
      return Math.min(this.amount, originalAmount);
    }
    return 0;
  }
}
