/**
 * Example tests for utility functions
 */

describe('Email Validation', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it('should validate correct email addresses', () => {
    expect(emailRegex.test('user@example.com')).toBe(true);
    expect(emailRegex.test('john.doe@company.co.uk')).toBe(true);
    expect(emailRegex.test('test+tag@domain.com')).toBe(true);
  });

  it('should reject invalid email addresses', () => {
    expect(emailRegex.test('invalid')).toBe(false);
    expect(emailRegex.test('invalid@')).toBe(false);
    expect(emailRegex.test('@invalid.com')).toBe(false);
    expect(emailRegex.test('invalid @example.com')).toBe(false);
  });
});

describe('Price Calculations', () => {
  it('should calculate total price correctly', () => {
    const products = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 3 },
    ];
    
    const total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    expect(total).toBe(350);
  });

  it('should apply discount correctly', () => {
    const subtotal = 1000;
    const discountPercent = 10;
    const discount = subtotal * (discountPercent / 100);
    
    expect(discount).toBe(100);
    expect(subtotal - discount).toBe(900);
  });

  it('should include delivery fee correctly', () => {
    const subtotal = 500;
    const deliveryFee = subtotal < 1000 ? 150 : 0;
    
    expect(deliveryFee).toBe(150);
    expect(subtotal + deliveryFee).toBe(650);
  });
});

describe('Array Operations', () => {
  it('should filter products by category', () => {
    const products = [
      { id: 1, category: 'roses', name: 'Red Rose' },
      { id: 2, category: 'tulips', name: 'Yellow Tulip' },
      { id: 3, category: 'roses', name: 'Pink Rose' },
    ];
    
    const roses = products.filter(p => p.category === 'roses');
    expect(roses).toHaveLength(2);
    expect(roses.every(p => p.category === 'roses')).toBe(true);
  });

  it('should sort products by price', () => {
    const products = [
      { id: 1, price: 500 },
      { id: 2, price: 200 },
      { id: 3, price: 800 },
    ];
    
    const sorted = [...products].sort((a, b) => a.price - b.price);
    expect(sorted[0].price).toBe(200);
    expect(sorted[2].price).toBe(800);
  });

  it('should remove duplicates from array', () => {
    const items = ['rose', 'tulip', 'rose', 'daisy', 'tulip'];
    const unique = [...new Set(items)];
    
    expect(unique).toHaveLength(3);
    expect(unique).toContain('rose');
    expect(unique).toContain('tulip');
    expect(unique).toContain('daisy');
  });
});
