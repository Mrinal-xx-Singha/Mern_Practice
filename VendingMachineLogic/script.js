class InventoryItem {
  constructor(code, name, price, quantity) {
    this.code = code;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

class VendingMachine {
  constructor() {
    this.items = new Map();
    this.coins = new Map();
    this.balance = 0;
  }

  insertCoin(coin) {
    const validCoins = [1, 2, 5, 10];
    if (!validCoins.includes(coin)) {
      return "Invalid coin";
    }
    this.balance += coin;
    this.coins.set(coin, (this.coins.get(coin) || 0) + 1);
    return `Inserted ₹${coin}. Current balance: ₹${this.balance}`;
  }

  addItem(item) {
    this.items.set(item.code, item);
  }

  selectItem(code) {
    if (!this.items.has(code)) return "Invalid item code";
    const item = this.items.get(code);

    if (item.quantity === 0) return "Item out of stock";

    if (this.balance < item.price) {
      return `Insufficient balance. Please insert ₹${
        item.price - this.balance
      } more.`;
    }

    const change = this.balance - item.price;
    const canGiveChange = this.calculateChange(change);

    if (!canGiveChange) {
      return "Cannot dispense change. Transaction cancelled.";
    }

    item.quantity -= 1;
    this.balance = 0;
    return `Dispensed ${item.name}. Change returned: ₹${change}`;
  }

  cancelTransaction() {
    const refund = this.balance;
    this.balance = 0;
    return `Transaction cancelled. Refunded ₹${refund}`;
  }

  calculateChange(amount) {
    let tempCoins = new Map(this.coins);
    const denominations = [10, 5, 2, 1];
    for (let coin of denominations) {
      while (amount >= coin && (tempCoins.get(coin) || 0) > 0) {
        amount -= coin;
        tempCoins.set(coin, tempCoins.get(coin) - 1);
      }
    }
    return amount === 0;
  }

  showItems() {
    return Array.from(this.items.values()).map(
      (item) =>
        `${item.code}: ${item.name} - ₹${item.price} [${item.quantity} left]`
    );
  }
}
const machine = new VendingMachine();
machine.addItem(new InventoryItem("A1", "Chips", 10, 5));
machine.addItem(new InventoryItem("B1", "Soda", 15, 3));
machine.addItem(new InventoryItem("C1", "Candy", 7, 10));

console.log(machine.insertCoin(10));
console.log(machine.selectItem("B1"));
console.log(machine.insertCoin(5));
console.log(machine.selectItem("B1"));
