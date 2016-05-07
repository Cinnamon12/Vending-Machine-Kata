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
  });

  it('displays current amount when valid coin is inserted', function(){
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
  })




});

