// src/services/shippingService.js
import axios from 'axios';
import qs from 'qs';
import '../config/env.js';
 

/**
 * RAJAONGKIR SHIPPING COST
 */
export async function calculateShippingCost(origin, destination, weight, courier) {
  const url = process.env.RAJAONGKIR_BASE_URL;

  try {
    const response = await axios.post(
      url,
      qs.stringify({
        origin,
        destination,
        weight,
        courier,
      }),
      {
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('RajaOngkir API error:', error.response?.data || error.message);
    throw new Error('Gagal mengambil ongkos kirim dari RajaOngkir');
  }
}
 
 
export default async function getShippingCostById({ origin, destination, weight, courier }) {
  const BASE_URL = process.env.RAJAONGKIR_BASE_URL_DESTINATION;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        shipper_destination_id: origin,
        receiver_destination_id: destination,
        weight: weight,
        courier: courier,  
        item_value: 1,
      },
      headers: {
        'x-api-key': process.env.KOMERCE_API_KEY,
      },
    });

    const calculateReguler = response.data?.data?.calculate_reguler;

    if (!calculateReguler || calculateReguler.length === 0) {
      console.log('❌ Tidak ditemukan layanan pengiriman reguler.');
      return null;
    }

    console.log('📦 Semua layanan:', calculateReguler);

    // Format semua layanan agar lebih rapi
    const formattedServices = calculateReguler.map(service => ({
      courier: service.shipping_name,
      service: service.service_name,
      cost: service.shipping_cost_net,
      etd: service.etd || '-',
    }));

    return formattedServices;

  } catch (error) {
    console.error('❌ Shipping API error:', error.response?.data || error.message);
    throw new Error('Gagal mengambil ongkos kirim dari Komerce API');
  }
}

 