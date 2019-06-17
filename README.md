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
	  "product": [                            

		  {"id": "43N23P", "count": "1"}         

	  ],

	  "amount": 0,                         

	  "plus_products": [                      
		  {"id": "234234", "count": "1"}
	  ],
	  "total_discount": 0,                   
	  "product_discount": []
    }

POST Remove Promotion: 

    http://IP:port/api/del_promo/

BODY JSON:

    {"id": "1"}

<h6>Managing Shopping Car</h6>