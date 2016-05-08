describe('vending machine', function() {
  let vm, validCoins, products;
  beforeEach(function () {
    vm = new vendingMachineController();
    validCoins = {
      "nickel": {
        "weight": 5.00,
        "diameter": 21.21,
        "thickness": 1.95,
        "value": 0.05
      },
      "dime": {
        "weight": 2.27,
        "diameter": 17.91,
        "thickness": 1.35,
        "value": 0.10
      },
      "quarter": {
        "weight": 5.67,
        "diameter": 24.26,
        "thickness": 1.75,
        "value": 0.25
      }
    },
    products = {
      "cola": {
        "price": 1.00,
        "quantity": 0
      },
      "chips": {
        "price": 0.50,
        "quantity": 10
      },
      "candy": {
        "price": 0.65,
        "quantity": 5
      }
    };
  });

  it('is set up correctly', function() {
    expect(vm).toBeTruthy();
  });

  it('accepts nickels', function() {
    let coinAdded = {
      "weight": 5.00,
      "diameter": 21.21,
      "thickness": 1.95
    };
    expect(vm.isCoinValid(coinAdded)).toBeTruthy();
    expect(coinAdded.value).toEqual(0.05);
  });

  it('accepts dimes', function() {
    let coinAdded = {
      "weight": 2.27,
      "diameter": 17.91,
      "thickness": 1.35
    }
    expect(vm.isCoinValid(coinAdded)).toBeTruthy();
    expect(coinAdded.value).toEqual(0.10);
  });

  it('accepts quarters', function() {
    let coinAdded = {
      "weight": 5.67,
      "diameter": 24.26,
      "thickness": 1.75
    }
    expect(vm.isCoinValid(coinAdded)).toBeTruthy();
    expect(coinAdded.value).toEqual(0.25);
  });

  it('does not accept pennies', function() {
    let coinAdded = {
      "weight": 2.50,
      "diameter": 19.05,
      "thickness": 1.52
    }
    expect(vm.isCoinValid(coinAdded)).toBeFalsy();
    vm.rejectCoins(coinAdded);
    expect(vm.returnedCoins).toContain(coinAdded);
  });

  it('displays current amount when valid coin is inserted', function() {
    let coinAdded = validCoins.quarter;
    vm.processCoinReceived(coinAdded);
    expect(vm.currentAmount).toEqual(0.25);
    expect(vm.displayMessage).toEqual(vm.currentAmount);
    coinAdded = validCoins.dime;
    vm.processCoinReceived(coinAdded);
    expect(vm.currentAmount).toEqual(0.35);
    expect(vm.displayMessage).toEqual(vm.currentAmount);
  });

  it('displays INSERT COIN when no coins inserted', function() {
    expect(vm.displayMessage).toEqual("INSERT COIN");
  });

  it('dispenses product and displays THANK YOU when enough money has been inserted', function() {
    let selectedProduct = products.chips;
    vm.dispenseProducts(selectedProduct, 0.50);
    expect(selectedProduct.quantity).toEqual(9);
    expect(vm.displayMessage).toEqual("THANK YOU");
    expect(vm.currentAmount).toEqual(0);
  });

  it('dispenses product and displays THANK YOU when enough money has been inserted', function() {
    let selectedProduct = products.chips;
    vm.dispenseProducts(selectedProduct, 0.50);
    expect(selectedProduct.quantity).toEqual(9);
    expect(vm.displayMessage).toEqual("THANK YOU");
    expect(vm.currentAmount).toEqual(0);
  });

   it('displays INSERT COIN after dispensing product', function() {
    let selectedProduct = products.chips;
    vm.dispenseProducts(selectedProduct, 0.50);
    vm.initialDisplay(vm.currentAmount);
    expect(vm.displayMessage).toEqual("INSERT COIN");
  });

   it('displays price when enough money has not been inserted', function() {
    let selectedProduct = products.candy;
    vm.currentAmount = 0.25;
    vm.notEnoughMoneyInserted(selectedProduct, vm.currentAmount);
    expect(vm.displayMessage).toEqual("PRICE: " + 0.65);
  });

   it(' displays either INSERT COIN or current amount when enough money has not been inserted', function() {
    let selectedProduct = products.candy;
    vm.currentAmount = 0.25;
    vm.notEnoughMoneyInserted(selectedProduct, vm.currentAmount);
    vm.initialDisplay(vm.currentAmount);
    expect(vm.displayMessage).toEqual(vm.currentAmount);
    vm.currentAmount = 0;
    vm.initialDisplay(vm.currentAmount);
    expect(vm.displayMessage).toEqual("INSERT COIN");
  });

   it ('returns change when the amount in machine is more than the price of the selected item', function() {
    let selectedProduct = products.candy;

    vm.currentAmount = 1.00;
    vm.makeChange(selectedProduct, vm.currentAmount);
    expect(vm.returnedCoins).toContain(validCoins.quarter);
    expect(vm.returnedCoins).toContain(validCoins.dime);
  });

   it('returns coins when "return coin" is selected and displays INSERT COIN', function() {
    let coinAdded = validCoins.dime;
    vm.processCoinReceived(coinAdded);
    coinAdded = validCoins.nickel;
    vm.processCoinReceived(coinAdded);
    vm.returnCoins(vm.currentAmount);
    expect(vm.returnedCoins).toContain(validCoins.nickel);
    expect(vm.returnedCoins).toContain(validCoins.dime);
    vm.initialDisplay(vm.currentAmount);
    expect(vm.displayMessage).toEqual("INSERT COIN");
  });

   it ('displays "SOLD OUT" when the selected item is not available', function() {
    let selectedProduct = products.cola;
    vm.currentAmount = 1.00;
    vm.soldOut(selectedProduct);
    expect(vm.displayMessage).toEqual("SOLD OUT");
  });

   it('indicates if exact change is required', function() {
    vm.coinsInMachine = {
      0.05: 0,
      0.10: 0,
      0.25: 0
    };
    expect(vm.isExactChangeOnly(products)).toBeTruthy();
    expect(vm.displayMessage).toEqual("EXACT CHANGE ONLY");
    vm.coinsInMachine = {
      0.05: 10,
      0.10: 10,
      0.25: 10
    };
    expect(vm.isExactChangeOnly(products)).toBeFalsy();
    expect(vm.displayMessage).toEqual("INSERT COIN");
  });
});

