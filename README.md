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

    {
	  "id": "1",                              
	  "promo": "Each sale of a MacBook comes with a free Raspberry Pi B",
	  "product": [                   // condition 1 for apply promo                        

		  {"id": "43N23P", "count": "1"}         

	  ],

	  "amount": 0,                  // condition 2 to apply promo                       

	  "plus_products": [            // when promo if adding new products                   
		  {"id": "234234", "count": "1"}
	  ],
	  "total_discount": 0,          // total percent discount                
	  "product_discount": [         // for product discount
	      {"id": "234234", "count": "1"}
	  ]
    }

POST Remove Promotion: 

    http://IP:port/api/del_promo/

BODY JSON:

    {"id": "1"}

<h6>Managing Shopping Car</h6>

POST Add Shop: 
    
    http://IP:port/api/add_shop/
    
BODY JSON:
 
    {
      "id": "1",
      "id_product": "43N23P",
      "count": 1        // product shop cuantity
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
      "id": "1",
    }
    
JSON OUT:

    {"err":false,"code":200,"msg":"OK","data":"Scanned Items: MacBook Pro, Raspberry Pi B Total: $5399.99"}