"use strict";
function vendingMachineController() {
  var validCoins = {
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
  this.currentAmount = 0,
  this.displayMessage = "INSERT COIN",
  this.coinsInMachine = {
    0.05: 0,
    0.10: 0,
    0.25: 0
  };
  this.isCoinValid = isCoinValid;
  this.processCoinReceived = processCoinReceived;

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
      this.coinsInMachine[coinAdded.value] += 1;
      this.currentAmount += coinAdded.value;
      this.displayMessage = this.currentAmount;
    }

  }




}
