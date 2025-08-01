export default class User {
  constructor({
    id,
    name,
    email,
    password,
    phone_number,
    role,
    alamat_jalan,
    kelurahan,
    kecamatan,
    kabupaten_kota,
    provinsi,
    kode_pos,
    avatar_url,
    is_verified,
    verification_token,
    verification_token_expiry,
    reset_token,
    reset_token_expiry,
    createdAt,
    updatedAt,
    strict = true
  }) {
    if (strict) {
      if (!name) throw new Error('Name is required');
      if (!email) throw new Error('Email is required');
      if (!password) throw new Error('Password is required');
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone_number = phone_number;
    this.role = role || 'buyer';

    // Alamat lengkap
    this.alamat_jalan = alamat_jalan;
    this.kelurahan = kelurahan;
    this.kecamatan = kecamatan;
    this.kabupaten_kota = kabupaten_kota;
    this.provinsi = provinsi;
    this.kode_pos = kode_pos;

    this.avatar_url = avatar_url;
    this.is_verified = is_verified ?? false;
    this.verification_token = verification_token;
    this.verification_token_expiry = verification_token_expiry
      ? new Date(verification_token_expiry)
      : null;
    this.reset_token = reset_token;
    this.reset_token_expiry = reset_token_expiry
      ? new Date(reset_token_expiry)
      : null;

    this.createdAt = createdAt ? new Date(createdAt) : null;
    this.updatedAt = updatedAt ? new Date(updatedAt) : null;
  }

  static fromDatabase(userData) {
    return new User({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone_number: userData.phone_number,
      role: userData.role,

      alamat_jalan: userData.alamat_jalan,
      kelurahan: userData.kelurahan,
      kecamatan: userData.kecamatan,
      kabupaten_kota: userData.kabupaten_kota,
      provinsi: userData.provinsi,
      kode_pos: userData.kode_pos,

      avatar_url: userData.avatar_url,
      is_verified: userData.is_verified,
      verification_token: userData.verification_token,
      verification_token_expiry: userData.verification_token_expiry,
      reset_token: userData.reset_token,
      reset_token_expiry: userData.reset_token_expiry,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      strict: false
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone_number: this.phone_number,
      role: this.role,

      alamat_jalan: this.alamat_jalan,
      kelurahan: this.kelurahan,
      kecamatan: this.kecamatan,
      kabupaten_kota: this.kabupaten_kota,
      provinsi: this.provinsi,
      kode_pos: this.kode_pos,

      avatar_url: this.avatar_url,
      is_verified: this.is_verified,
      verification_token: this.verification_token,
      verification_token_expiry: this.verification_token_expiry,
      reset_token: this.reset_token,
      reset_token_expiry: this.reset_token_expiry,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toProfileJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone_number: this.phone_number,
      role: this.role,

      alamat_jalan: this.alamat_jalan,
      kelurahan: this.kelurahan,
      kecamatan: this.kecamatan,
      kabupaten_kota: this.kabupaten_kota,
      provinsi: this.provinsi,
      kode_pos: this.kode_pos,

      avatar_url: this.avatar_url,
      is_verified: this.is_verified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
