export default class Product {
  constructor({
    id,
    name,
    description,
    price,
    stock = 0,
    imageUrl = null,
    status = 'active',
    created_at = new Date(),
    updated_at = new Date()
  }, strict = true) {
    // Validation
    if (strict && !name) throw new Error('Name is required');
    if (strict && !price) throw new Error('Price is required');
    if (strict && price < 0) throw new Error('Price must be positive');
    if (strict && stock < 0) throw new Error('Stock cannot be negative');

    this.id = id;
    this.name = name;
    this.description = description;
    this.price = parseFloat(price);
    this.stock = parseInt(stock);
    this.imageUrl = imageUrl;
    this.status = status;
    this.created_at = new Date(created_at);
    this.updated_at = new Date(updated_at);
  }

  static fromDb(data) {
    if(!data || typeof data != 'object'){
      throw new Error('Invalid data for Product.fromDb');
    }
    // Safe fallback for missing fields
    return new Product({
      id: data.id,
      name: data.name,
      description: data.description ?? '',
      price: data.price ?? 0,
      stock: data.stock ?? 0,
      imageUrl: data.imageUrl ?? null,
      status: data.status ?? 'active',
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date()
    }, false); // turn off strict mode
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      imageUrl: this.imageUrl,
      status: this.status,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  updateStock(quantity) {
    const newStock = this.stock + quantity;
    if (newStock < 0) throw new Error('Insufficient stock');
    this.stock = newStock;
  }

  setStatus(status) {
    if (!['active', 'inactive'].includes(status)) {
      throw new Error('Invalid status');
    }
    this.status = status;
  }

  isActive() {
    return this.status === 'active';
  }

  hasStock() {
    return this.stock > 0;
  }

  updatePrice(newPrice) {
    if (newPrice < 0) throw new Error('Price must be positive');
    this.price = parseFloat(newPrice);
    this.updated_at = new Date();
  }
}