"use strict";
function vendingMachineController() {
  let vm = this,
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
  vm.currentAmount = 0,
  vm.displayMessage = "INSERT COIN",
  vm.coinsInMachine = {
    0.05: 0,
    0.10: 0,
    0.25: 0
  };
  vm.returnedCoins = [];
  vm.isCoinValid = isCoinValid;
  vm.processCoinReceived = processCoinReceived;
  vm.rejectCoins = rejectCoins;
  vm.dispenseProducts = dispenseProducts;
  vm.initialDisplay = initialDisplay;

  function isCoinValid(coinAdded) {
    let validProperty;
    for (var coinType in validCoins){
      if (validCoins.hasOwnProperty(coinType)){
        validProperty = validCoins[coinType];
        if (validProperty.weight === coinAdded.weight && validProperty.diameter === coinAdded.diameter && validProperty.thickness ===
         coinAdded.thickness) {
          coinAdded.value = validProperty.value;
          return true;
        }
      }
    }
    return false;
  }

  function processCoinReceived(coinAdded) {
    if (isCoinValid(coinAdded)) {
      vm.coinsInMachine[coinAdded.value] += 1;
      vm.currentAmount += coinAdded.value;
      vm.displayMessage = vm.currentAmount;
    }
  }

  function rejectCoins(coinAdded){
    if(!isCoinValid(coinAdded)){
      vm.returnedCoins.push(coinAdded);
    }
  }

  function dispenseProducts(selectedProduct, currentAmount) {
    if (currentAmount == selectedProduct.price) {
      selectedProduct.quantity -= 1;
      vm.displayMessage="THANK YOU";
      vm.currentAmount = 0;
      }
  }

  function initialDisplay(currentAmount) {
    if (currentAmount === 0) {
      vm.displayMessage = "INSERT COIN";
    }
    else{
      vm.displayMessage = currentAmount;
    }
  }


}
