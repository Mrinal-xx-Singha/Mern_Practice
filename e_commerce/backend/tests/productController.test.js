import { test, mock } from 'node:test';
import assert from 'node:assert';
import { getProducts, createProducts, updateProduct, deleteProduct } from '../controllers/productController.js';
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

test('createProducts - Success Path', async () => {
  const req = {
    body: { name: 'New Product', price: 20, description: 'Desc', image: 'img.jpg' }
  };

  const saveMock = mock.method(Product.prototype, 'save', async function() {
    return this;
  });

  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 201);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.strictEqual(data.name, 'New Product');
      assert.strictEqual(data.price, 20);
      return this;
    }),
  };

  await createProducts(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);
  assert.strictEqual(saveMock.mock.callCount(), 1);

  saveMock.mock.restore();
});

test('deleteProduct - Success Path', async () => {
  const req = {
    params: { id: 'someId' }
  };

  const mockDeletedProduct = { _id: 'someId', name: 'Deleted Product' };

  const findByIdAndDeleteMock = mock.method(Product, 'findByIdAndDelete', async () => {
    return mockDeletedProduct;
  });

  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 200);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, { message: "Product deleted successfully" });
      return this;
    }),
  };

  await deleteProduct(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);
  assert.strictEqual(findByIdAndDeleteMock.mock.callCount(), 1);

  findByIdAndDeleteMock.mock.restore();
});

test('deleteProduct - Not Found Path', async () => {
  const req = {
    params: { id: 'someId' }
  };

  const findByIdAndDeleteMock = mock.method(Product, 'findByIdAndDelete', async () => {
    return null; // Simulate not found
  });

  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 404);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, { message: "Product not found" });
      return this;
    }),
  };

  await deleteProduct(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);
  assert.strictEqual(findByIdAndDeleteMock.mock.callCount(), 1);

  findByIdAndDeleteMock.mock.restore();
});

test('deleteProduct - Error Path', async () => {
  const req = {
    params: { id: 'someId' }
  };

  const findByIdAndDeleteMock = mock.method(Product, 'findByIdAndDelete', async () => {
    throw new Error('Database Error');
  });

  const logMock = mock.method(console, 'error', () => {});

  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 500);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, { message: "Error deleting product" });
      return this;
    }),
  };

  await deleteProduct(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);
  assert.strictEqual(findByIdAndDeleteMock.mock.callCount(), 1);

  findByIdAndDeleteMock.mock.restore();
  logMock.mock.restore();
});

test('updateProduct - Success Path', async () => {
  const req = {
    params: { id: 'someId' },
    body: { name: 'Updated Product', price: 25, description: 'Desc2', image: 'img2.jpg' }
  };

  const mockUpdatedProduct = { ...req.body, _id: 'someId' };

  const findByIdAndUpdateMock = mock.method(Product, 'findByIdAndUpdate', async () => {
    return mockUpdatedProduct;
  });

  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 200);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, mockUpdatedProduct);
      return this;
    }),
  };

  await updateProduct(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);
  assert.strictEqual(findByIdAndUpdateMock.mock.callCount(), 1);

  findByIdAndUpdateMock.mock.restore();
});

test('updateProduct - Not Found Path', async () => {
  const req = {
    params: { id: 'someId' },
    body: { name: 'Updated Product', price: 25, description: 'Desc2', image: 'img2.jpg' }
  };

  const findByIdAndUpdateMock = mock.method(Product, 'findByIdAndUpdate', async () => {
    return null; // Simulate not found
  });

  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 404);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, { message: "Product not found" });
      return this;
    }),
  };

  await updateProduct(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);
  assert.strictEqual(findByIdAndUpdateMock.mock.callCount(), 1);

  findByIdAndUpdateMock.mock.restore();
});

test('updateProduct - Error Path', async () => {
  const req = {
    params: { id: 'someId' },
    body: { name: 'Updated Product', price: 25, description: 'Desc2', image: 'img2.jpg' }
  };

  const findByIdAndUpdateMock = mock.method(Product, 'findByIdAndUpdate', async () => {
    throw new Error('Database Error');
  });

  const logMock = mock.method(console, 'error', () => {});

  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 500);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, { message: "Error updating product" });
      return this;
    }),
  };

  await updateProduct(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);
  assert.strictEqual(findByIdAndUpdateMock.mock.callCount(), 1);

  findByIdAndUpdateMock.mock.restore();
  logMock.mock.restore();
});

test('createProducts - Error Path', async () => {
  const req = {
    body: { name: 'New Product', price: 20, description: 'Desc', image: 'img.jpg' }
  };

  const saveMock = mock.method(Product.prototype, 'save', async function() {
    throw new Error('Save Error');
  });

  const res = {
    status: mock.fn(function(code) {
      assert.strictEqual(code, 400);
      return this;
    }),
    json: mock.fn(function(data) {
      assert.deepStrictEqual(data, { message: "Error creating product" });
      return this;
    }),
  };

  await createProducts(req, res);

  assert.strictEqual(res.status.mock.callCount(), 1);
  assert.strictEqual(res.json.mock.callCount(), 1);
  assert.strictEqual(saveMock.mock.callCount(), 1);

  saveMock.mock.restore();
});
