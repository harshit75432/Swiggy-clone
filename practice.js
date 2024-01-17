let food_items = [
    {
        food_name : 'Cholee Bhatura',
        food_type : 'veg',
        food_prices: [
            {
                title : 'Full',
                price : 100
            },
            {
                title : 'Half',
                price : 50
            }
        ],
        add_ons : [
            {
                title : 'Extra bhaturaa',
                price : 30
            },
            {
                title : 'cholee',
                price : 30
            }
        ]   
    },

    {
        food_name : 'Samosa',
        food_type : 'Veg',
        food_prices : {
            title : '1',
            price : 30
        },
        add_ons : [
            {
                title : 'Extra Chatnyy',
                price : 40
            }
        ]
    },
    {
        food_name : 'Momos',
        food_type : 'Veg',
        food_prices :[ {
            title : 'Full',
            price : 100
        },
        {
            title : 'Half',
            price : 50
        }
    ],
    add_ons : []
    },
    {
        food_name : 'Special Thali',
        food_type : 'Veg',
        food_prices :[{
            title : 'Thali With Raita',
            price : 200
        },
        {
            title : 'Thali without Raita',
            price : 150
        }
    ]
    },
    {
        food_name : 'Pizza',
        food_type : 'Veg',
        food_price:[{
            title : 'Medium',
            price : 100
        },
        {
            title : 'Large',
            price : 200
        }],
        add_ons:[{
            title : 'Extra Chess',
            price : 50
        },{
            title : 'Extra Stuff',
            price : 60
        }]
    }
]





let getMinAmount = ()=>{
    let minAmount = 0
    let max_price = Number.MAX_VALUE
    for(let i=0;i<food_items.length;i++){
        let food_prices = food_items[i].food_prices
        for(let j=0;j<food_prices.length;j++){
            if(max_price > food_prices[j].price){
                max_price = food_prices[j].price
                console.log(max_price);
            }
        }
        
        minAmount += max_price    
        console.log(minAmount);
    }
    return minAmount
}


// total amount of money is 500
//Total amount of people is 3

function amountOfFoodMoney(){
    let maxAmount = 500
    let amountDetails = []
    let people = 3
    let onePerson
    for(let i=0;i<food_items.length;i++){
        let max_price = 0
        if(maxAmount > 0){
            let food_price = food_items[i].food_prices
            for(let j=0;j<food_price.length;j++){
                if(max_price < food_price[j].price){
                    max_price = food_price[j].price
                    let ammount = `${i+1}. ${food_items[i].food_name} price is ${food_price[j].price}`;
                    amountDetails.push(ammount)
                }
            }
        
        }
    }
    return amountDetails
}

console.log(amountOfFoodMoney()); 