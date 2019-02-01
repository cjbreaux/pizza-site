//BUSINESS LOGIC//

function Pizza(size,toppings) {
  this.size = size
  this.toppings = toppings


}

//calculates the prize of a pizza
Pizza.prototype.calculatePrice = function(size,toppings) {
  var price = 10;
  if (this.size === "small") {
    price -= 3;
  }
  if (this.size === "large") {
    price += 5;
  }
  for (var i=0; i<this.toppings.length; i++) {
    price += 1;
  }
  this.cost = price; //adds Property to Pizza object
  return price;
}

//for testing
var pizza1 = new Pizza("small", ["pepperoni","pickles"]);
var pizza2 = new Pizza("large", ["olives"]);
var pizza3 = new Pizza("medium",[]);



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
    $(".myPizzaPrice").text(myPizzaPrice);

   // $("input:checkbox[name=toppings]:checked").each(function(){
   //    var inputToppings = $(this).val();
   //    console.log(inputToppings); // to display later
    // })
  })
});
