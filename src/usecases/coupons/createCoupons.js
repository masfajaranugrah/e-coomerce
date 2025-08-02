import couponRepository from "../../repositories/couponRepository.js";
export const createCoupon = async (data) => {
  const requiredFields = ['code', 'type', 'amount', 'expires_at'];
  console.log(requiredFields)
  for (let field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Field '${field}' wajib diisi`);
    }
  }

  if (!['percent', 'fixed'].includes(data.type)) {
    throw new Error("Tipe kupon harus 'percent' atau 'fixed'");
  }

  // Simpan ke database
  const created = await couponRepository.createCoupon(data);
  return created;
};
