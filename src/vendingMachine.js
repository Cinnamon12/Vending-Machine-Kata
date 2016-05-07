"use strict";
function vendingMachineController() {
  var currentAmount = 0;
  this.isCoinValid = isCoinValid;

  function isCoinValid (coinAdded, validCoins) {
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

}
