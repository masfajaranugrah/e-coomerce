export default class User {
  constructor({
    id,
    name,
    email,
    password_hash,
    role = 'user',
    access_token = null,
    refresh_token = null,
    paket_id = null,
    paket_expired = null,
    is_verified = false,
    verification_token = null,
    verification_token_expiry = null,
    reset_token = null,
    reset_token_expiry = null,
    is_blocked = false,
    blocked_reason = null,
    avatar_url = null,
    phone_number = null,
    address = null,
    created_at = new Date(),
    last_login = null
  }, strict = true) {

    if (strict && !name) throw new Error('Name is required');
    if (strict && !email) throw new Error('Email is required');
    if (strict && !password_hash) throw new Error('Password hash is required');

    this.id = id;
    this.name = name;
    this.email = email?.toLowerCase();
    this.password_hash = password_hash;
    this.role = role;

    this.access_token = access_token;
    this.refresh_token = refresh_token;

    this.paket_id = paket_id;
    this.paket_expired = paket_expired ? new Date(paket_expired) : null;

    this.is_verified = is_verified;
    this.verification_token = verification_token;
    this.verification_token_expiry = verification_token_expiry ? new Date(verification_token_expiry) : null;

    this.reset_token = reset_token;
    this.reset_token_expiry = reset_token_expiry ? new Date(reset_token_expiry) : null;

    this.is_blocked = is_blocked;
    this.blocked_reason = blocked_reason;

    this.avatar_url = avatar_url;
    this.phone_number = phone_number;
    this.address = address;

    this.created_at = new Date(created_at);
    this.last_login = last_login ? new Date(last_login) : null;
  }

  static fromDb(data) {
    if (!data || typeof data !== 'object') {
      throw new Error("Invalid user data from DB");
    }
    return new User(data, false);
  }

  // Return basic user info
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      paket_id: this.paket_id,
      paket_expired: this.paket_expired,
      is_verified: this.is_verified,
      is_blocked: this.is_blocked,
      blocked_reason: this.blocked_reason,
      avatar_url: this.avatar_url,
      phone_number: this.phone_number,
      address: this.address,
      created_at: this.created_at,
      last_login: this.last_login
    };
  }

  // For login response
  toAuthJSON() {
    return {
      access_token: `Bearer ${this.access_token}`,
      refresh_token: `Bearer ${this.refresh_token}`,
      ...this.toJSON(),
    };
  }

  // For register response
  toAuthRegJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      paket_id: this.paket_id,
      paket_expired: this.paket_expired,
      verification_token: this.verification_token,
      verification_token_expiry: this.verification_token_expiry,
      is_verified: this.is_verified,
      is_blocked: this.is_blocked,
      avatar_url: this.avatar_url,
      created_at: this.created_at,
      last_login: this.last_login
    };
  }

  // For verification
  toAuthVerificationJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      verification_token: this.verification_token,
      verification_token_expiry: this.verification_token_expiry,
      is_verified: this.is_verified,
    };
  }

  // For profile page
  toProfileJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      avatar_url: this.avatar_url,
      phone_number: this.phone_number,
      address: this.address,
      is_verified: this.is_verified,
      created_at: this.created_at
    };
  }

  updateLoginTime() {
    this.last_login = new Date();
  }

  verify() {
    this.is_verified = true;
    this.verification_token = null;
  }

  block(reason = 'Unknown reason') {
    this.is_blocked = true;
    this.blocked_reason = reason;
  }

  unblock() {
    this.is_blocked = false;
    this.blocked_reason = null;
  }

  isPaketExpired() {
    if (!this.paket_expired) return true;
    return new Date() > this.paket_expired;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isSeller() {
    return this.role === 'seller';
  }
}
