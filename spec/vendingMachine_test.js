describe('vending machine', function() {
  let vm, validCoins;
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
    expect(vm.isCoinValid(coinAdded, validCoins)).toBeTruthy();
    expect(coinAdded.value).toEqual(0.05);
  });

  it('accepts dimes', function() {
    let coinAdded = {
      "weight": 2.27,
      "diameter": 17.91,
      "thickness": 1.35
    }
    expect(vm.isCoinValid(coinAdded, validCoins)).toBeTruthy();
    expect(coinAdded.value).toEqual(0.10);
  });

  it('accepts quarters', function() {
    let coinAdded = {
      "weight": 5.67,
      "diameter": 24.26,
      "thickness": 1.75
    }
    expect(vm.isCoinValid(coinAdded, validCoins)).toBeTruthy();
    expect(coinAdded.value).toEqual(0.25);
  });


});

