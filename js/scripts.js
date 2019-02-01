//BUSINESS LOGIC//

//Ordering Logic to keep track of multiple pizzas
function Order() {
  this.pizzas = []
}

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}

Order.prototype.totalPrice = function(){
  var total = 0
  for (var i = 0; i<this.pizzas.length; i++) {
    total += this.pizzas[i].cost
  }
  return total;
}

//Pizza creation logic
function Pizza(size,crust,meat,veg) {
  this.size = size
  this.crust = crust
  this.meat = meat
  this.veg = veg


}

//calculates the prize of a pizza
Pizza.prototype.calculatePrice = function(size,crust,meat,veg) {
  var price = 10;
  if (this.size === "Small") {
    price -= 3;
  }
  if (this.size === "Large") {
    price += 5;
  }

  if (this.crust === "Crispy" || this.crust === "Thin"){
    price += 2
    } else if (this.crust === "Deep-Dish") {
      price += 7
      }

  for (var i=0; i<this.meat.length; i++) {
    price += 2;
  }
  for (var i=0; i<this.veg.length; i++) {
    price += 1;
  }
  this.cost = price; //adds Property to Pizza object
  return price;
}

Pizza.prototype.showReceipt = function() {

  $(".myPizzaPrice").text(this.cost);
  $(".myPizzaSize").text(this.size);



  if (this.meat.length > 0 || this.veg.length > 0) {
    $(".numOfToppings").text(this.meat.length + this.veg.length + " topping");
    // $(".myToppings").text(" with " + this.toppings.join(", ")); //sort of working but need a better method to show info
  }
}


// for testing purposes
// var pizza1 = new Pizza ("Large","Thin",["Ham","Sausage","Bacon"],[],15);
// var pizza2 = new Pizza ("Small","Crispy",["Ham","Bacon"],["Corn"],10);
// var pizza3 = new Pizza ("Medium","Deep-Dish",["Ham"],["Olives","Onions"],5);
// var pizza4 = new Pizza ("Large","Regular",[],[]);

//UI LOGIC//
var myOrder = new Order;

$(document).ready(function(){
  $("form#pizzaForm").submit(function(event){
    event.preventDefault();
    var inputSize = $("#pizzaSize option:selected").val();
    console.log(inputSize);
    var inputCrust = $("#pizzaCrust option:selected").val();
    console.log(inputCrust);
    var inputMeat = [];
    $("input:checkbox[name=meat]:checked").each(function(){
      inputMeat.push($(this).val());
    });
    console.log(inputMeat);
    var inputVeg = [];
    $("input:checkbox[name=veg]:checked").each(function(){
      inputVeg.push($(this).val());
    });
    console.log(inputVeg);
    var myPizza = new Pizza(inputSize,inputCrust,inputMeat,inputVeg);
    var myPizzaPrice = myPizza.calculatePrice();
    console.log(myPizzaPrice);

    myOrder.addPizza(myPizza);
    $(".myPizzaPrice").text(myOrder.totalPrice());


  })
});
