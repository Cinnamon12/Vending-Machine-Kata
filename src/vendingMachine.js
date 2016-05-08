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
    0.05: 10,
    0.10: 10,
    0.25: 10
  };
  vm.returnedCoins = [],
  vm.amountToReturn = 0;
  vm.isCoinValid = isCoinValid;
  vm.processCoinReceived = processCoinReceived;
  vm.rejectCoins = rejectCoins;
  vm.dispenseProducts = dispenseProducts;
  vm.initialDisplay = initialDisplay;
  vm.notEnoughMoneyInserted = notEnoughMoneyInserted;
  vm.makeChange = makeChange;

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
      vm.displayMessage = "THANK YOU";
      makeChange(selectedProduct, currentAmount);
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

  function notEnoughMoneyInserted(selectedProduct, currentAmount) {
    if (0 < currentAmount && currentAmount < selectedProduct.price) {
      vm.displayMessage = "PRICE: " + selectedProduct.price;
    }
  }

  function makeChange(selectedProduct, currentAmount) {
    if (selectedProduct.price < currentAmount) {
      vm.amountToReturn = currentAmount - selectedProduct.price;
      returnChange(vm.amountToReturn);
    }
    else {
      vm.amountToReturn = 0;
    }
    return vm.amountToReturn;
  }

  function returnChange(amountToReturn) {
    let noOfQuartersToReturn, noOfNickelsToReturn, noOfDimesToReturn = 0;
    if(amountToReturn >= 0.25){
      noOfQuartersToReturn = (Math.floor(amountToReturn/0.25));
      amountToReturn -= noOfQuartersToReturn*0.25;
      amountToReturn = amountToReturn.toFixed(2);
      for(var i = noOfQuartersToReturn; i > 0; i--) {
        if(vm.coinsInMachine[0.25] != 0) {
          vm.coinsInMachine[0.25] -= 1;
          vm.returnedCoins.push(validCoins.quarter);
        }
      }
    }
    if(amountToReturn >= 0.10) {
      noOfDimesToReturn = (Math.floor(amountToReturn/0.10));
      amountToReturn -= noOfDimesToReturn*0.10;
      amountToReturn = amountToReturn.toFixed(2);
      for(var i = noOfDimesToReturn; i > 0; i--) {
        if(vm.coinsInMachine[0.10] != 0){
          vm.coinsInMachine[0.10] -= 1;
          vm.returnedCoins.push(validCoins.dime);
        }
      }
    }
    if(amountToReturn >= 0.05) {
      noOfNickelsToReturn = (Math.floor(amountToReturn/0.05));
      alert(noOfNickelsToReturn);
      amountToReturn -= noOfNickelsToReturn*0.05;
      amountToReturn = amountToReturn.toFixed(2);
      for(var i = noOfNickelsToReturn; i > 0; i--) {
        if(vm.coinsInMachine[0.05] != 0){
          vm.coinsInMachine[0.05] -= 1;
          vm.returnedCoins.push(validCoins.nickel);
        }
      }
    }
    return vm.returnedCoins;
  }

}
