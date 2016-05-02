describe('vending machine', function() {
  let vm;
  beforeEach(function () {
    vm = new vendingMachineController();
  });

  it('is set up correctly', function() {
    expect(vm).toBeTruthy();
  });
});
