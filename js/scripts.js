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
