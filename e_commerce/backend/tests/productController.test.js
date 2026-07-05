import { test, mock } from 'node:test';
import assert from 'node:assert';
import { getProducts } from '../controllers/productController.js';
import Product from '../models/Product.js';

test('getProducts - Success Path', async () => {
  const mockProducts = [{ name: 'Product 1', price: 10 }];

  // Mock Product.find to return mockProducts
  const findMock = mock.method(Product, 'find', async () => {
    return mockProducts;
  });

  const req = {};
  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 200);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, mockProducts);
      return this;
    }),
  };

  await getProducts(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);

  findMock.mock.restore();
});

test('getProducts - Error Path (Database Error)', async () => {
  // Mock Product.find to reject with an error
  const findMock = mock.method(Product, 'find', async () => {
    throw new Error('Database Error');
  });

  // Mock console.log to avoid cluttering test output
  const logMock = mock.method(console, 'log', () => {});

  const req = {};
  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 500);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, { message: 'Error fetching products' });
      return this;
    }),
  };

  await getProducts(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);

  findMock.mock.restore();
  logMock.mock.restore();
});
