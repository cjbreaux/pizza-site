//BUSINESS LOGIC//

//Ordering Logic to keep track of multiple pizzas
function Order() {
  this.pizzas = []
  this.pizzaId = 0
}

//Adds Unique ID to each pizza
Order.prototype.assignId = function (pizza) {
  this.pizzaId += 1;
  pizza.id = this.pizzaId;
}

//test remove pizza
Order.prototype.deletePizza = function(id) {
  for(var i = 0; i < this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        this.pizzas.splice( this.pizzas[i],1); //use splice to reindex array but need to total the price again
        this.totalPrice();
        return true;
      }
    }
  };
  return false;
}

// Adds individual pizza object to Order array
Order.prototype.addPizza = function(pizza) {
  this.assignId(pizza); //assigns unique ID before adding to array
  this.pizzas.push(pizza);
}

// Calculates the cost of the entire order
Order.prototype.totalPrice = function(){
  var total = 0
  for (var i = 0; i<this.pizzas.length; i++) {
    total += this.pizzas[i].cost
  }
  this.totalCost = total;
  return total;
}

Order.prototype.showOrder = function (){
  $(".myPizzaPrice").text(this.totalCost);
}




//still volatile
Order.prototype.createCard = function() {
  var myCard = ""
  for (var i = 0; i<this.pizzas.length; i++) {
    myCard = `<div class="card col-3">
    <img class="card-img-top" src="img/pizza.jpg" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">Pizza ` + (this.pizzas[i].id) + `</h5>
    <p class="card-text">Please review your order <br>` + `Size: ` + this.pizzas[i].size +
    `<br> Crust: ` + this.pizzas[i].crust +
    `<br> Toppings: ` + this.pizzas[i].toppings +
    `<br> Price: $` + this.pizzas[i].cost + `</p>
    <a href="#" class="btn btn-primary" id="del`+ this.pizzas[i].id + `">Remove</a>
    </div>
    </div>`;

  }
  $(".card-display").append(myCard);
}









//Pizza creation logic
function Pizza(size,crust,meat,veg) {
  this.size = size
  this.crust = crust
  this.meat = meat
  this.veg = veg


}

//Calculates the prize of a pizza
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

Pizza.prototype.combo = function () {
  var toppings = []
  var output = ""
  this.meat.forEach(function(meat){
    toppings.push(meat)
  });
  this.veg.forEach(function(veg){
    toppings.push(veg)
  });
  output = toppings.join(", ");
  this.toppings = output
  console.log(output);
  return output;
}



//Displays information to user //use Order method instead
// Pizza.prototype.showReceipt = function() {
//
//   $(".myPizzaPrice").text(this.cost);
//   $(".myPizzaSize").text(this.size);
//
//
//
//   if (this.meat.length > 0 || this.veg.length > 0) {
//     $(".numOfToppings").text(this.meat.length + this.veg.length + " topping");
//     // $(".myToppings").text(" with " + this.toppings.join(", ")); //sort of working but need a better method to show info
//   }
// }


// for testing purposes
var pizza1 = new Pizza ("Large","Thin",["Ham","Sausage","Bacon"],[],15);
var pizza2 = new Pizza ("Small","Crispy",["Ham","Bacon"],["Corn"],10);
var pizza3 = new Pizza ("Medium","Deep-Dish",["Ham"],["Olives","Onions"],5);
var pizza4 = new Pizza ("Large","Regular",[],[]);

var attachEventHandlers = function() {
  $(".remove").on("click", function() {
    alert("testing clicks")
  })
}

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
    $("#modalVeg .close").click();
    $(".receipt").show();

    myPizza.combo();
    myOrder.addPizza(myPizza);
    myOrder.totalPrice();
    myOrder.showOrder();
    myOrder.createCard();

    // $(".myPizzaPrice").text(myOrder.totalPrice());


  })
  // $("#lastButton").click(function(){
  //   $("#submit").show();
  // })
});
