//const { create } = require("../../model/productModel");

window.onload= ()=>{
    console.log('purchase js connected');
};

function openModal(selectUrl){

    //2 things will happen ----1. it will fetch the details of the product 2. it will launch a modal 
    //create a modal btn <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
 // Launch demo modal
 // </button>  and click it to launch the modal 
    if(document.querySelector('.testBtn')){
        document.querySelector('.test').removeChild(document.querySelector('.testBtn'));
    }
    var url;
    var id = document.querySelector('#selectProductId').value;
    var isPresent=checkIfProductExist(id);
    if(isPresent){
        if(selectUrl==='product'){url=`/apiPageRouter/getSelectedProduct/${id}`}
        // console.log(url)
        fetchData(url); // fetch the required data
        activateModal();
    }else{
        //another modal
        console.log('present item ');
    }
    
  
}

function checkIfProductExist(productId){
    var isPresent= true ;
    if(document.querySelector('.purchaseTable').children.length>1){ //console.log('checking');
        document.querySelector('.purchaseTable').querySelectorAll('select').forEach(e=>{
            if(e.value===productId){ //console.log(`attr:${e.value} productId : ${productId}`);
                isPresent = false;
            }
        });return isPresent;
    }else{
        return true;
    }
}

function fetchData(url){ // this function fetches data frm the database of product database
    fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
         // console.log(data); -- it contains the data from server and now can be used 
         insertDataIntoModal(data); //this func inserts data into modal from fetched data.......  
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function insertDataIntoModal(data){ // function to insert data into modal.
    document.querySelector('.modal-title').innerHTML = data.itemName;
    document.querySelector('.itemInStock').innerHTML=data.inStockQuantity;
    document.querySelector('.itemPurity').innerHTML=data.itemPurity;
    document.querySelector('.purchaseLabour').innerHTML=data.purchaseLabour;
    document.querySelector('.purchaseWastage').innerHTML=data.purchasePurity;
    document.querySelector('.saveBtn').setAttribute('data-id',data._id);
}

function activateModal(){
    //create a modal btn <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
 // Launch demo modal
 // </button> 
 //console.log('in modal');
 var btn = document.createElement('button');
 btn.classList.add('testBtn');
 btn.setAttribute('type','button');
 btn.setAttribute('data-bs-target',"#staticBackdrop");
 btn.setAttribute('data-bs-toggle','modal');
 //console.log(btn);
 document.querySelector('.test').appendChild(btn);
 btn.click();

}

function decorateModal(event){
    var stockIncrement = parseFloat(event.target.value) + parseFloat(document.querySelector('.itemInStock').innerHTML); 
    document.querySelector('.stockIncrement').innerHTML = stockIncrement;
    var fineSilver = parseFloat(event.target.value)*(parseFloat(document.querySelector('.itemPurity').innerHTML)+parseFloat(document.querySelector('.purchaseWastage').innerHTML))/100;
    document.querySelector('.fineSilverModal').innerHTML = fineSilver;
    var labourCash = parseFloat(event.target.value)*parseFloat(document.querySelector('.purchaseLabour').innerHTML)/1000;
    document.querySelector('.labourCashModal').innerHTML = labourCash;

}

function createPurchaseTable(event){
    /* table will be crreated once the modal save changes btn is clicked
    but,
    imp...check if the input fields are filled with correct data...
    1. before the table is created it will check if the product purchase is a new one added tp table and no existing
    product is added to the table.
    2. row of table can be deleted 
    3 . two type of table will be created as per requirement one labour per kg and one rate per piece
    4.  
    */
   //console.log(event.target.dataset.id);
   createTableStructure(event);
}

function createTableStructure(event){
    /*
   1. create an element 
   2. set setAttribute
   3. create a text node 
   4. append the element. */
   var table = {
        box1:{
            el:'div',
            htmlClass:['text-capitalize','container','topContainer','mt-1'],
            attr:{ },
            text:''
        },
        row1:{
            el:'div',
            htmlClass:['border','border-secondary','row'],
            attr:{ },
            text:''
        },
        col1_row1:{
            el:'div',
            htmlClass:['col-2','border-end','border-secondary'],
            attr:{ },
            text:''
        },
        col2_row1:{
            el:'div',
            htmlClass:['col-7','border-end','border-secondary'],
            attr:{ },
            text:''
        },
        col3_row1:{
            el:'div',
            htmlClass:['col-3'],
            attr:{ },
            text:''
        },
        div1_col1_row1:{
            el:'div',
            htmlClass:['form-text','text-muted'],
            attr:{ },
            text:'s.n'
        },
        div2_col1_row1:{
            el:'div',
            htmlClass:['text-success','fw-bold'],
            attr:{ },
            text: CountSN(document.querySelector('.purchaseTable'))
        },
        div1_col2_row1:{
            el:'div',
            htmlClass:['form-text','text-muted'],
            attr:{ },
            text:'item name'
        },
        div2_col2_row1:{
            el:'div',
            htmlClass:[],
            attr:{ },
            text:''
        },
        select_div2_col2_row1:{
            el:'select',
            htmlClass:['form-select','d-none'],
            attr:{'name':'itemName'},
            text:''
        },
        option_div2_col2_row1:{
            el:'option',
            htmlClass:[],
            attr:{'value':event.target.dataset.id,'selected':'true'},
            text: document.querySelector('.modal-title').innerHTML
        },
        text_div2_col2_row1:{
            el:'span',
            htmlClass:['text-success','fw-bold'],
            attr:{},
            text: document.querySelector('.modal-title').innerHTML
        },
        div1_col3_row1:{
            el:'div',
            htmlClass:['form-text','text-muted'],
            attr:{},
            text:'item purity'
        },
        div2_col3_row1:{
            el:'div',
            htmlClass:['text-success','fw-bold'],
            attr:{},
            text: document.querySelector('.itemPurity').innerHTML
        },
        row2:{
            el:'div',
            htmlClass:['row','border','border-secondary'],
            attr:{},
            text:''
        },
        col1_row2:{ 
            el:'div',
            htmlClass:['col-3','border-end','border-secondary'],
            attr:{},
            text:''
        },
        col2_row2:{
            el:'div',
            htmlClass:['col-4','border-end','border-secondary'],
            attr:{},
            text:''
        },
        col3_row2:{
            el:'div',
            htmlClass:['col-5'],
            attr:{},
            text:''
        },
        div1_col1_row2:{
            el:'div',
            htmlClass:[],
            attr:{},
            text:''
        },
        span1_div1_col1_row2:{
            el:'span',
            htmlClass:['text-muted'],
            attr:{},
            text:'p.wastage '
        },
        span2_div1_col1_row2:{
            el:'span',
            htmlClass:['text-success','fw-bold','mx-1'],
            attr:{},
            text: document.querySelector('.purchaseWastage').innerHTML
        },
        div2_col1_row2:{
            el:'div',
            htmlClass:[],
            attr:{},
            text:''
        },
        span1_div2_col1_row2:{
            el:'span',
            htmlClass:['text-muted'],
            attr:{},
            text:'p.labour '
        },
        span2_div2_col1_row2:{
            el:'span',
            htmlClass:['text-success','fw-bold','mx-1'],
            attr:{},
            text: document.querySelector('.purchaseLabour').innerHTML
        },
        div1_col2_row2:{
            el:'div',
            htmlClass:['form-text','text-muted'],
            attr:{},
            text:'item weight'
        },
        div2_col2_row2:{
            el:'div',
            htmlClass:['text-success','fw-bold'],
            attr:{},
            text: document.querySelector('#itemWeight').value +' Grms'
        },
        itemWeight_input:{
            el:'input',
            htmlClass:['d-none'],
            attr:{'name':'itemWeight','value':document.querySelector('#itemWeight').value}
        },
        div1_col3_row2:{
            el:'div',
            htmlClass:['mb-2'],
            attr:{},
            text: ''
        },
        div2_col3_row2:{
            el:'div',
            htmlClass:[],
            attr:{},
            text:''
        },
        span1_div1_col3_row2:{
            el:'span',
            htmlClass:['text-muted','fw-bold'],
            attr:{},
            text:'fine silver '
        },
        span2_div1_col3_row2:{
            el:'span',
            htmlClass:['text-success','fw-bold','mx-1'],
            attr:{},
            text: document.querySelector('.fineSilverModal').innerHTML
        },
        span1_div2_col3_row2:{
            el:'span',
            htmlClass:['text-muted','fw-bold'],
            attr:{},
            text:'purchase cash '
        },
        span2_div2_col3_row2:{
            el:'span',
            htmlClass:['text-success','fw-bold','mx-1'],
            attr:{},
            text: document.querySelector('.labourCashModal').innerHTML
        },
        //trial code 
        
        fineSilver_input:{
            el:'input',
            htmlClass:['d-none'],
            attr:{'name':'fineSilver','value':document.querySelector('.fineSilverModal').innerHTML},
            text:''
        },
        labourCash_input:{
            el:'input',
            htmlClass:['d-none'],
            attr:{'name':'labourCash','value':document.querySelector('.labourCashModal').innerHTML},
            text:''
        }

        //ends
   };
   var box1=createElement(table.box1);
   appendElement(box1,document.querySelector('.purchaseTable'));
   var row1=createElement(table.row1);
   appendElement(row1,box1);
   var col1_row1= createElement(table.col1_row1);
   appendElement(col1_row1,row1);
   var col2_row1 = createElement(table.col2_row1);
   appendElement(col2_row1,row1);
   var col3_row1 = createElement(table.col3_row1);
   appendElement(col3_row1,row1);
   var div1_col1_row1=createElement(table.div1_col1_row1);
   appendElement(div1_col1_row1,col1_row1);
   var div2_col1_row1 = createElement(table.div2_col1_row1);
   appendElement(div2_col1_row1,col1_row1);
   var div1_col2_row1 = createElement(table.div1_col2_row1);
   appendElement(div1_col2_row1,col2_row1);
   var div2_col2_row1 = createElement(table.div2_col2_row1);
   appendElement(div2_col2_row1,col2_row1);
   var select_div2_col2_row1 = createElement(table.select_div2_col2_row1);
   appendElement(select_div2_col2_row1,div2_col2_row1);
   var option_div2_col2_row1 = createElement(table.option_div2_col2_row1);
   appendElement(option_div2_col2_row1,select_div2_col2_row1);
   var text_div2_col2_row1 = createElement(table.text_div2_col2_row1);
   appendElement(text_div2_col2_row1,div2_col2_row1);
   var div1_col3_row1 = createElement(table.div1_col3_row1);
   appendElement(div1_col3_row1,col3_row1);
   var div2_col3_row1 = createElement(table.div2_col3_row1);
   appendElement(div2_col3_row1,col3_row1);
   var row2 = createElement(table.row2);
   appendElement(row2,box1);
   var col1_row2 = createElement(table.col1_row2);
   appendElement(col1_row2,row2);
   var col2_row2 = createElement(table.col2_row2);
   appendElement(col2_row2,row2);
   var col3_row2=createElement(table.col3_row2);
   appendElement(col3_row2,row2);
   var div1_col1_row2= createElement(table.div1_col1_row2);
   appendElement(div1_col1_row2,col1_row2);
   var span1_div1_col1_row2 = createElement(table.span1_div1_col1_row2);
   appendElement(span1_div1_col1_row2,div1_col1_row2);
   var span2_div1_col1_row2=createElement(table.span2_div1_col1_row2);
   appendElement(span2_div1_col1_row2,div1_col1_row2);
   var div2_col1_row2= createElement(table.div2_col1_row2);
   appendElement(div2_col1_row2,col1_row2);
   var span1_div2_col1_row2 = createElement(table.span1_div2_col1_row2);
   appendElement(span1_div2_col1_row2,div2_col1_row2);
   var span2_div2_col1_row2=createElement(table.span2_div2_col1_row2);
   appendElement(span2_div2_col1_row2,div2_col1_row2);
   var div1_col2_row2 = createElement(table.div1_col2_row2);
   appendElement(div1_col2_row2,col2_row2);
   var div2_col2_row2 = createElement(table.div2_col2_row2);
   appendElement(div2_col2_row2,col2_row2);
   var div1_col3_row2 = createElement(table.div1_col3_row2);
   appendElement(div1_col3_row2,col3_row2);
   var div2_col3_row2 = createElement(table.div2_col3_row2);
   appendElement(div2_col3_row2,col3_row2);
   var span1_div1_col3_row2 = createElement(table.span1_div1_col3_row2);
   appendElement(span1_div1_col3_row2,div1_col3_row2);
   var span2_div1_col3_row2 = createElement(table.span2_div1_col3_row2);
   appendElement(span2_div1_col3_row2,div1_col3_row2);
   var span1_div2_col3_row2 = createElement(table.span1_div2_col3_row2);
   appendElement(span1_div2_col3_row2,div2_col3_row2);
   var span2_div2_col3_row2 = createElement(table.span2_div2_col3_row2);
   appendElement(span2_div2_col3_row2,div2_col3_row2);
   //trial code
   var fineSilver_input = createElement(table.fineSilver_input);
   appendElement(fineSilver_input,div1_col3_row2);
   var itemWeight_input = createElement(table.itemWeight_input);
   appendElement(itemWeight_input,div2_col2_row2);
   var labourCash_input = createElement(table.labourCash_input);
   appendElement(labourCash_input,div2_col3_row2);

   //ends

   subTotalCalulate();
}

function createElement(arg){
    var element = document.createElement(arg.el);
    addClassList(element,arg);
    setAttribute(element,arg);
    textNode(element,arg);
    return element;
}

function addClassList(element,arg){
    arg.htmlClass.forEach(e=> {
        element.classList.add(e)
    });
    
}

function setAttribute(element, arg) {
    for(var key in arg.attr) {
      element.setAttribute(key, arg.attr[key]);
    }
    
  }

  function textNode(element,arg){
      element.appendChild(document.createTextNode(arg.text));
  }

  function appendElement(element,parent){
      parent.appendChild(element);
     // console.log(element);
  }

  function CountSN(element){
      if(element.children.length===1){
        addMoreProduct();
      }
      return element.children.length;
  }

  function addMoreProduct(){
      var btn = {
        el:'button',
        htmlClass:['btn','btn-primary','btn-sm'],
        attr:{'onclick':'focusSelectProduct()','type':'button'},
        text:'Add More Product'
      }
      var addBtn = createElement(btn)
      appendElement(addBtn,document.querySelector('.addMoreProduct'));
      
  }

  function focusSelectProduct(){
      document.querySelector('#selectProductId').focus();
  }

  function subTotalCalulate(){
      var fineSilver_val = 0;
      var purchaseLabour_val = 0;
      document.querySelector('.purchaseTable').querySelectorAll('input').forEach(e=>{
         if(e.getAttribute('name')==='fineSilver'){
              fineSilver_val = fineSilver_val+parseFloat(e.getAttribute('value'));} });
      document.querySelector('.netFineSilver').innerHTML = fineSilver_val;
      document.querySelector('.purchaseTable').querySelectorAll('input').forEach(e=>{
        if(e.getAttribute('name')==='labourCash'){
             purchaseLabour_val = purchaseLabour_val+parseFloat(e.getAttribute('value'));} });
      document.querySelector('.netPurchaseCash').innerHTML=purchaseLabour_val;
  }

