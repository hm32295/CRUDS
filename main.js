let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let create = document.getElementById("create");
let table = document.getElementById("table");
let deleteAll = document.getElementById("deleteAll");
let Update = document.getElementById("Update");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCatagory = document.getElementById("searchCatagory");
Update.style.display = "none";

// console.log(title,price,taxes,ads,discount,total,count,category,create)

// get Toltal

function getTotal(){
    // console.log("done")
    if( price.value != "" &&  taxes.value != "" && ads.value != "" ){
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
        total.style.background = "#040";
        
    }
    if( price.value == "" ||  taxes.value == "" || ads.value == "" ){
        total.innerHTML ="";
        total.style.background = "#f83838"

    }
}


// Create product
let arrProduct;
if(localStorage.product != null){
    arrProduct = JSON.parse(localStorage.product)
}else{
     arrProduct = [];
}
create.onclick = function()  {


    if(title.value != "" || price.value != "" ){

        let objProduct = {
            title : title.value,
            price : price.value,
            taxes : taxes.value,
            ads : ads.value,
            discount : discount.value,
            total : total.innerHTML,
            category : category.value,
            count : +count.value
    }
    for(i = 0 ; i < objProduct.count ; i++){
    arrProduct.push(objProduct)
    }
    localStorage.setItem("product",JSON.stringify(arrProduct))

    clearInputs()
    readData()

    }

}

readData()
 // save local srorge
 
 
 
 
 
 
 
 // clear inputs
 function clearInputs(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
    total.style.background = "#f83838"
 }
 // read
function readData(){
    let tableData = "";
    for(let i = 0 ; i < arrProduct.length ; i++){

        tableData += `
                 <tr>
                    <td>${i + 1 }</td>
                    <td>${arrProduct[i].title}</td>
                    <td>${arrProduct[i].ads}</td>
                    <td>${arrProduct[i].taxes}</td>
                    <td>${arrProduct[i].price}</td>
                    <td>${arrProduct[i].discount}</td>
                    <th>${arrProduct[i].total}</th>
                    <td>${arrProduct[i].category}</td>
                    <td><button onclick = "updateData(${i})">Update</button></td>
                    <td><button onclick = "deleteData(${i})">Delete</button></td>
                </tr>
        `

    }
    table.innerHTML = tableData
    if(table.innerHTML == ""){
        deleteAll.style.display = "none";
    }else{
        deleteAll.style.display = "block";
        deleteAll.innerHTML = `Delete All ( ${arrProduct.length } )`
    }

}

 // count

//  delete


function deleteData(i){
   
   arrProduct.splice(i,1);

   localStorage.product = JSON.stringify(arrProduct);
   readData()
   
}
deleteAll.onclick = function(){
    arrProduct =[];
    localStorage.product = JSON.stringify(arrProduct);
    table.innerHTML = ""
    
    readData()
    // deleteAll.innerHTML = ``

}

    

// update
let tmb;
function updateData(i){

    title.value=  arrProduct[i].title;
    price.value=  arrProduct[i].price;
    ads.value=  arrProduct[i].ads;
    taxes.value=  arrProduct[i].taxes;
    discount.value=  arrProduct[i].discount;
    category.value=  arrProduct[i].category;

    create.style.display = "none";
    Update.style.display = "block";
    count.style.display = "none";
    getTotal();
    tmb = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
    
}

Update.onclick = function(){
    if(title.value != "" || price.value != "" ){

        let objProduct = {
            title : title.value,
            price : price.value,
            taxes : taxes.value,
            ads : ads.value,
            discount : discount.value,
            total : total.innerHTML,
            category : category.value,
            count : +count.value
    }
    
    localStorage.setItem("product",JSON.stringify(arrProduct))
    arrProduct[tmb] = objProduct
}
    count.style.display = "block";
    create.style.display = "block";
    Update.style.display = "none";
    clearInputs()
    readData()

    }
    




// search
function search_title(){
    search.placeholder  = "Search By Title";
    search.focus()


}
function search_catagory(){
    search.placeholder  = "Search By Catagory";
    search.focus()


}
function search_input(value){
    let tableData = "";
    if(search.placeholder == "Search By Catagory"){
        for(let i = 0 ; i < arrProduct.length; i++){

            if(arrProduct[i].category.includes(value)){
                console.log(i)
                tableData += `
                    <tr>
                        <td>${i + 1 }</td>
                        <td>${arrProduct[i].title}</td>
                        <td>${arrProduct[i].ads}</td>
                        <td>${arrProduct[i].taxes}</td>
                        <td>${arrProduct[i].price}</td>
                        <td>${arrProduct[i].discount}</td>
                        <th>${arrProduct[i].total}</th>
                        <td>${arrProduct[i].category}</td>
                        <td><button onclick = "updateData(${i})">Update</button></td>
                        <td><button onclick = "deleteData(${i})">Delete</button></td>
                    </tr>
            `

    }
    
        
    }
    }
    else if(search.placeholder  == "Search By Title"){
        for(let i = 0 ; i < arrProduct.length; i++){

                if(arrProduct[i].title.includes(value)){
                    console.log(i)
                    tableData += `
                        <tr>
                            <td>${i + 1 }</td>
                            <td>${arrProduct[i].title}</td>
                            <td>${arrProduct[i].ads}</td>
                            <td>${arrProduct[i].taxes}</td>
                            <td>${arrProduct[i].price}</td>
                            <td>${arrProduct[i].discount}</td>
                            <th>${arrProduct[i].total}</th>
                            <td>${arrProduct[i].category}</td>
                            <td><button onclick = "updateData(${i})">Update</button></td>
                            <td><button onclick = "deleteData(${i})">Delete</button></td>
                        </tr>
                `
                }
        }
    }
    table.innerHTML = tableData


}



// clean date