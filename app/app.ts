// lib/app.ts
import express = require('express');

// Create a new express application instance
const app: express.Application = express();

// Using body parser for helping parsing
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let products = {};

// sample of json products
/*
  {
    "FKUCE": {"price": 10, "name": "Alexa"},
  }
*/

let promotions = {};

// sample of json promotions
/*
  {
    "0001": {

          "promo": "Buy 3 Alexas for the price of 2",
          "product": [
              {"id": "FKUCE", "count": "3"}
          ],
          "amount": 0,
          "plus_products": [],

          "total_discount": 33,
          "product_discount": []

      }
  }
*/

let shopping_car = {};

// sample of json shopping_car
/*
  {
    "0001": {

          "FKUCE": {"total": 3}

      }
  }
*/

// response error api codes

/*
 JSON response

 {
    err: false,           // if any error
    code: 200,            // error code
    msg: "OK",            // msg error
    data: ""              // data response
 };

 */

////////////////////
// JSON SAMPLES

// products = {
//   "120P90": { "name": "Google Home", "price": 49.99},
//   "43N23P": { "name": "MacBook Pro", "price": 5399.99},
//   "A304SD": { "name": "Alexa Speaker", "price": 109.5},
//   "234234": { "name": "Raspberry Pi B", "price": 30}
// };
//
// promotions = {
//     "1": {
//       "promo": "Each sale of a MacBook comes with a free Raspberry Pi B",
//       "product": [
//         {"id": "43N23P", "count": "1"}
//         ],
//       "amount": 0,
//       "plus_products": [
//           {"id": "234234", "count": "1"}
//         ],
//       "total_discount": 0,
//       "product_discount": []
//       },
//     "2": {
//       "promo": "Buy 3 Google Homes for the price of 2",
//       "product": [
//           {"id": "120P90", "count": "3"}
//         ],
//       "amount": 0,
//       "plus_products": [],
//       "total_discount": 0.333333333333333333333333,
//       "product_discount": []
//       },
//     "3": {
//       "promo": "Buying more than 2 Alexa Speakers will have a 10% discount on all Alexa Speakers",
//       "product": [
//           {"id": "A304SD", "count": "2+"}
//       ],
//       "amount": 0,
//       "plus_products": [],
//       "total_discount": 0,
//       "product_discount": [
//           {"id": "A304SD", "discount": 0.10}
//         ]
//       },
// };
//
// shopping_car = {
//   "1": {
//       "id_product": "43N23P",
//       "count": 1
//   },
//   "2": {
//       "id_product": "120P90",
//       "count": 3
//   },
//   "3": {
//       "id_product": "A304SD",
//       "count": 3
//   }
// };

// ENDED JSON SAMPLES
////////////////////

let error_msg = {
  200: "OK",
  101: "missing data element",
  102: "duplicated entry element",
  103: "missing entry element",
};

app.get('/', function (req, res) {
  res.send('Shop API OK.');
});

////////////////////
// MANAGING PRODUCTS

// adding or updating
app.post('/api/add_product', function (req, res) {
    // sample body: {"id": "123", "name": "Selfie", "price": 0.5}
    console.log("add_product");
    console.log(req.body);

    let response = {err: false, code: 200, msg: "OK", data: ""};

    if(!req.body.id || !req.body.name || !req.body.price ) {
        response.err = true;
        response.code = 101;
        response.msg = error_msg[101];
    }

    // adding or updating item if exists
    if (response.code == 200){
        if (products[req.body.id]){
          delete products[req.body.id];
        }
        products[req.body.id] = {"price": req.body.price, "name": req.body.name};
    }

    console.log("PRODUCTS:");
    console.log(products);

    res.send(response);
});

// deleting
app.post('/api/del_product', function (req, res) {
    // sample body: {"id": "123"}
    console.log("del_product");
    console.log(req.body);

    let response = {err: false, code: 200, msg: "OK", data: ""};

    if(!req.body.id) {
        response.err = true;
        response.code = 101;
        response.msg = error_msg[101];
    }

    // finding and deleting item
    if (response.code == 200){
        if (!products[req.body.id]){
            response.err = true;
            response.code = 103;
            response.msg = error_msg[103];
        }
        else {
            delete products[req.body.id];
        }
    }

    console.log("PRODUCTS:");
    console.log(products);

    res.send(response);
});

// ENDED MANAGING PRODUCTS
////////////////////


////////////////////
// MANAGING PROMOTIONS

// adding or updating
app.post('/api/add_promo', function (req, res) {

    // sample body:
    // {
    //      "id": "1",                              # id of promo
    //      "promo": "Buy 3 for the price of 2",
    //      "product": [                            # when promo is for buying a product or combined

    //          {"id": "123", "count": "3+"},       # three or more
    //          {"id": "234", "count": "3"}         # exactly 3

    //      ],

    //      "amount": 1000,                         # when promo if about total price spend

    //      "plus_products": [                      # promo of free products included
    //          {"id": "123", "count": 3}
    //      ],
    //      "total_discount": 10,                   # promo of TOTAL SPEND percent discount
    //      "product_discount": [                   # promo of PRODUCT percent discount
    //          {"id": "123", "discount": 10}
    //      ]
    // }

    console.log("add_promo");
    console.log(req.body);

    let response = {err: false, code: 200, msg: "OK", data: ""};

    if(!req.body.id || !req.body.promo || (!req.body.product && !req.body.amount) ||
        (!req.body.plus_products && !req.body.total_discount && !req.body.product_discount)) {
        response.err = true;
        response.code = 101;
        response.msg = error_msg[101];
    }

    // adding or updating item if exists
    if (response.code == 200){
        if (promotions[req.body.id]) {
            delete promotions[req.body.id];
        }
        promotions[req.body.id] = {
            "promo": req.body.promo, "product": req.body.product, "amount": req.body.amount,
            "plus_products": req.body.plus_products, "total_discount":  req.body.total_discount,
            "product_discount": req.body.product_discount
        };
    }

    console.log("PROMOTIONS:");
    console.log(promotions);

    res.send(response);
});

// deleting
app.post('/api/del_promo', function (req, res) {

    // sample body: {"id": "123"}

    console.log("del_promo");
    console.log(req.body);

    let response = {err: false, code: 200, msg: "OK", data: ""};

    if(!req.body.id) {
        response.err = true;
        response.code = 101;
        response.msg = error_msg[101];
    }

    // finding item
    if (response.code == 200) {
        if (!promotions[req.body.id]){
            response.err = true;
            response.code = 103;
            response.msg = error_msg[103];
        }
        else {
          delete promotions[req.body.id];
        }
    }

    console.log("PROMOTIONS:");
    console.log(promotions);

    res.send(response);
});

// ENDED MANAGING PROMOTIONS
////////////////////


////////////////////
// MANAGING SHOPPING CARS

// adding or updating product to a shopping car
app.post('/api/add_shop', function (req, res) {

    // sample body:
    // {
    //      "id": "1",
    //      "id_product": "123",
    //      "count": 3              # can be float too
    // }

    console.log("add_shop");
    console.log(req.body);

    let response = {err: false, code: 200, msg: "OK", data: ""};

    if(!req.body.id || !req.body.id_product || !req.body.count) {
        response.err = true;
        response.code = 101;
        response.msg = error_msg[101];
    }

    // adding or updating item if exists
    if (response.code == 200){
        if (shopping_car[req.body.id]) {
            delete shopping_car[req.body.id];
        }
        shopping_car[req.body.id] = {};
        shopping_car[req.body.id][req.body.id_product] = {"total": req.body.count};
    }

    console.log("SHOPPING_CARS:");
    console.log(shopping_car);

    res.send(response);
});

// removing product of a shopping car
app.post('/api/del_shop', function (req, res) {

    // sample body:     {"id": "1", "id_product": "123"}

    console.log("del_shop");
    console.log(req.body);

    let response = {err: false, code: 200, msg: "OK", data: ""};

    if(!req.body.id || !req.body.id_product) {
        response.err = true;
        response.code = 101;
        response.msg = error_msg[101];
    }

    // finding item
    if (response.code == 200) {
        if (!shopping_car[req.body.id] || !shopping_car[req.body.id][req.body.id_product]){
            response.err = true;
            response.code = 103;
            response.msg = error_msg[103];
        }
        else {
            delete shopping_car[req.body.id][req.body.id_product];
        }
    }

    console.log("SHOPPING_CARS:");
    console.log(shopping_car);

    res.send(response);
});


// obtain amount of the shopping applying actual promos
app.post('/api/scanner', function (req, res) {

    // sample body:     {"id": "1"}

    console.log("review_shop");
    console.log(req.body);

    let response = {err: false, code: 200, msg: "OK", data: ""};

    if(!req.body.id) {
        response.err = true;
        response.code = 101;
        response.msg = error_msg[101];
    }

    let id = req.body.id;

    // finding item
    if (response.code == 200) {
        if (!shopping_car[id]){
            response.err = true;
            response.code = 103;
            response.msg = error_msg[103];
        }
        else {
            let result_scan = "Scanned Items: ";
            let total_money_shop = 0;
            // getting the total shopping
            total_money_shop += shopping_car[id].count * products[shopping_car[id].id_product].price;
            for (let i=0; i<shopping_car[id].count; i++)
              result_scan += products[shopping_car[id].id_product].name + ', ';
            // applying promos
            for (let i in promotions) {                                                 // for each promotion
                let apply_promo = false;
                // finding if this shop have promo of total spend money
                if (promotions[i].amount > 0 && total_shop >= promotions[i].amount) {
                    // applying the promo
                    apply_promo = true;
                    if (promotions[i].plus_products) {
                        for (let j in promotions[i].plus_products) {
                            result_scan += products[j].name + ', ';                     // adding free products
                        }
                    }
                }
                // finding if this shop have promo of shopping products
                if (promotions[i].product) {
                    for (let j in promotions[i].product) {
                        for (let k in shopping_car[id]) {
                            if(shopping_car[id][k] == promotions[i].product[j].id){
                                // one of the shopping product have promotion
                                if (promotions[i].plus_products) {
                                    for (let l in promotions[i].plus_products) {
                                        // adding free products
                                        result_scan += products[promotions[i].plus_products[l].id].name + ', ';
                                    }
                                }
                                if (promotions[i].total_discount) {
                                    // adding global discount
                                    total_money_shop *= promotions[i].total_discount;
                                }
                                if (promotions[i].product_discount[0]) {
                                    console.log("PROMO: ", promotions[i].product_discount);
                                    // adding product discount
                                    let unitary_price = products[shopping_car[id].id_product].price;
                                    let total_items = shopping_car[id].count;
                                    total_money_shop -= total_items*unitary_price*promotions[i].product_discount[0].discount;
                                }
                            }
                        }
                    }
                }
            }
            // adding to response the data items
            response["data"] = result_scan.slice(0, -2) + " Total: $" + total_money_shop.toString();
        }
    }

    console.log("SCANNER:");
    console.log(response);

    res.send(response);
});


// ENDED MANAGING SHOPPING CAR
////////////////////

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});