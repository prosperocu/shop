# api shop

= Requirements =
* node v10+

= Deploy steps =
1. Clone this repo.
2. Install dependencies: 

npm install

3. Run development server:

npm run dev

3.1 Or production server:

npm run prod

= API Requests =

<h6>Managing Products</h6>

POST Add Product: 

    http://IP:port/api/add_product/

BODY JSON:

    {"id": "120P90", "name": "Google Home", "price": 49.99}

POST Remove Product: 

     http://IP:port/api/del_product/

BODY JSON:

    {"id": "120P90"}

<h6>Managing Promos</h6>

POST Add Promotion: 
    
    http://IP:port/api/add_promo/

BODY JSON:

    // sample input PROMO 1
    {
	  "id": "1",                              
	  "promo": "Each sale of a MacBook comes with a free Raspberry Pi B",
	  "product": [                   // condition to apply promo (buying products)                        

		  {"id": "43N23P", "rule": "==1"}         

	  ],                    

	  "plus_products": [            // when promo is adding free products                   
		  {"id": "234234", "count": "1"}
	  ],
	  "total_discount": 0,          // when promo is global percent discount                
	  "product_discount": [         // when promo is for for product percent discount
	  
	  ]
    }
    
    // sample input PROMO 2
    {
          "id": "2",                              
          "promo": "Buy 3 Google Homes for the price of 2",
          "product": [                            
    
              {"id": "120P90", "rule": "==3"}         
    
          ],                       
    
          "plus_products": [],
          "total_discount": 0.333333333333333333333333,                   
          "product_discount": [                   
              
          ]
    }
    
    // sample input PROMO 3
    {
          "id": "3",                              
          "promo": "Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa Speakers",
          "product": [                            
    
              {"id": "A304SD", "rule": ">3"}         
    
          ],                       
    
          "plus_products": [],
          "total_discount": 0,                   
          "product_discount": [                   
              {"id": "A304SD", "discount": 0.10} 
          ]
    }
    
    // NOTE: In rules of promotions can be apply all operators: >, <, >=, <= and ==

POST Remove Promotion: 

    http://IP:port/api/del_promo/

BODY JSON:

    {"id": "1"}

<h6>Managing Shopping Car</h6>

POST Add Shop: 
    
    http://IP:port/api/add_shop/
    
BODY JSON:
 
    // for apply PROMO 1
    {
      "id": "1",
      "id_product": "43N23P",
      "count": 1        // product shop cuantity, can be float too
    }    
    
    // for apply PROMO 2
    {
      "id": "2",
      "id_product": "120P90",
      "count": 3
    }    
    
    // for apply PROMO 3
    {
      "id": "3",
      "id_product": "A304SD",
      "count": 4
    }
    
POST Del Shop: 
    
    http://IP:port/api/del_shop/
    
BODY JSON:
 
    {
      "id": "1",
    }
    
POST Scanner (for get Total Spend): 
        
    http://IP:port/api/scanner/
        
BODY JSON:
     
    {
      "id": "1",    // for promo ID=1
    }
    
JSON OUT:

    // response for promo ID=1
    {"err":false,"code":200,"msg":"OK","data":"Scanned Items: MacBook Pro, Raspberry Pi B Total: $5399.99"}