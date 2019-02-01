//BUSINESS LOGIC//

function Pizza(size,toppings) {
  this.size = size
  this.toppings = toppings


}

//calculates the prize of a pizza
Pizza.prototype.calculatePrice = function(size,toppings) {
  var price = 10;
  if (this.size === "Small") {
    price -= 3;
  }
  if (this.size === "Large") {
    price += 5;
  }
  for (var i=0; i<this.toppings.length; i++) {
    price += 1;
  }
  this.cost = price; //adds Property to Pizza object
  return price;
}

Pizza.prototype.showReceipt = function() {
  $(".myPizzaPrice").text(this.cost);
  $(".myPizzaSize").text(this.size);

}

//UI LOGIC//
$(document).ready(function(){
  $("form#pizzaForm").submit(function(event){
    event.preventDefault();
    var inputSize = $("#pizzaSize option:selected").val();
    console.log(inputSize);
    var inputToppings = []; $("input:checkbox[name=toppings]:checked").each(function(){
      inputToppings.push($(this).val());
    });
    console.log(inputToppings);
    var myPizza = new Pizza(inputSize,inputToppings);
    var myPizzaPrice = myPizza.calculatePrice();
    myPizza.showReceipt();

    //$(".myPizzaPrice").text(myPizzaPrice); simple way to show price

   // $("input:checkbox[name=toppings]:checked").each(function(){
   //    var inputToppings = $(this).val();
   //    console.log(inputToppings); // to display later
    // })
  })
});
