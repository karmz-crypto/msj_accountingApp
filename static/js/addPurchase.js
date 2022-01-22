//const { create } = require("../../model/productModel");

window.onload= ()=>{
    console.log('purchase js connected');
};
/*
var client = {
    onSelectClient = (event)=>{
        var id = event.tatget.value;
        var url = `/pageRouter/getSelectedClient/${id}`;
        fetchData(url,'client');
    }
};

function onSelectClient(event){
    //1.fetch client details
    var id = event.tatget.value;
    var url = `/pageRouter/getSelectedClient/${id}`;
    fetchData(url,'client');

} */


function openModal(selectUrl){ // modal for selected product 

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
        fetchData(url,'product'); // fetch the required data
        activateModal("#staticBackdrop");//the target modal identifier
    }else{
        //another modal
        console.log('present item ');
        updateDeleteModal();
    }
    
  
}

function updateDeleteModal(){
    activateModal('#upDelModal')
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

function fetchClient(event){
    var url = `/apiPageRouter/getSelectedClient/${event.target.value}`;
    fetchData(url,'client')
}

function fetchData(url,identifier){ // this function fetches data frm the database of product database
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
         if(identifier==='product'){
            insertDataIntoModal(data); //this func inserts data into modal from fetched data.......  
         }
         if(identifier==='client'){
            insertClientData(data);
         }
         
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function insertClientData(data){
    document.querySelector('.clientType').innerHTML=data.clientType;
    if(data.paymentStatusSilver<0){
        document.querySelector('.silverBalance-client').classList.add('text-success');
        document.querySelector('.silverBalance-client').innerHTML = data.paymentStatusSilver;
    }else{
        
        document.querySelector('.silverBalance-client').classList.add('text-danger');
        document.querySelector('.silverBalance-client').innerHTML = data.paymentStatusSilver;
    }

    if(data.paymentStatusCash<0){
        document.querySelector('.purchaseCash-client').classList.add('text-success')
        document.querySelector('.purchaseCash-client').innerHTML = data.paymentStatusCash;
    }else{
        document.querySelector('.purchaseCash-client').classList.add('text-danger');
        document.querySelector('.purchaseCash-client').innerHTML = data.paymentStatusCash;
    }

    document.querySelector('.clientDataDiv').classList.remove('d-none');
    
    
}

function insertDataIntoModal(data){ // function to insert data into modal.
   
    document.querySelector('.modal-title').innerHTML = data.itemName;
    document.querySelector('.itemInStock').innerHTML=data.inStockQuantity;
    document.querySelector('.itemPurity').innerHTML=data.itemPurity;
    document.querySelector('#purchaseLabour').value = data.purchaseLabour;
    document.querySelector('.purchaseLabour').innerHTML = document.querySelector('#purchaseLabour').value
    document.querySelector('#purchaseWastage').value=data.purchasePurity;
    document.querySelector('.purchaseWastage').innerHTML=document.querySelector('#purchaseWastage').value
    document.querySelector('.saveBtn').setAttribute('data-id',data._id);
   
}

function activateModal(target){
    //create a modal btn <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
 // Launch demo modal
 // </button> 
 //console.log('in modal');
 var btn = document.createElement('button');
 btn.classList.add('testBtn');
 btn.setAttribute('type','button');
 btn.setAttribute('data-bs-target',target);
 btn.setAttribute('data-bs-toggle','modal');
 //console.log(btn);
 document.querySelector('.test').appendChild(btn);
 btn.click();

}

function decorateModal(event){
    if(event.target.getAttribute('id')==='itemWeight'){
        document.querySelector('.stockIncrement').innerHTML= parseFloat(event.target.value) + parseFloat(document.querySelector('.itemInStock').innerHTML); 
        document.querySelector('#fineSilver_inputModal').value = parseFloat(event.target.value)*(parseFloat(document.querySelector('.itemPurity').innerHTML)+parseFloat(document.querySelector('#purchaseWastage').value))/100;
        document.querySelector('.fineSilverModal').innerHTML = document.querySelector('#fineSilver_inputModal').value;
        document.querySelector('#labourCash_inputModal').value = parseFloat(event.target.value)*parseFloat(document.querySelector('#purchaseLabour').value)/1000;
        document.querySelector('.labourCashModal').innerHTML = document.querySelector('#labourCash_inputModal').value; 
    }else if(event.target.getAttribute('id')==='purchaseLabour'){
        document.querySelector('.purchaseLbour_input_modal').classList.add('d-none');
        document.querySelector('.purchaseLabourDisplayModal').classList.remove('d-none');
        document.querySelector('#labourCash_inputModal').value = parseFloat(event.target.value)*parseFloat(document.querySelector('#itemWeight').value)/1000;
        document.querySelector('.labourCashModal').innerHTML = document.querySelector('#labourCash_inputModal').value;
        document.querySelector('.purchaseLabour').innerHTML = document.querySelector('#purchaseLabour').value  ;  
    }else if(event.target.getAttribute('id')==='purchaseWastage'){
        document.querySelector('.purchaseWastage_input_modal').classList.add('d-none');
        document.querySelector('.purchaseWastageDisplayModal').classList.remove('d-none');
        document.querySelector('#fineSilver_inputModal').value = parseFloat(document.querySelector('#itemWeight').value)*(parseFloat(document.querySelector('.itemPurity').innerHTML)+parseFloat(event.target.value))/100;
        document.querySelector('.fineSilverModal').innerHTML = document.querySelector('#fineSilver_inputModal').value;
        document.querySelector('.purchaseWastage').innerHTML=document.querySelector('#purchaseWastage').value;
    }  
}

function changeLabourModal(){
    document.querySelector('.purchaseLabourDisplayModal').classList.add('d-none');
    document.querySelector('.purchaseLbour_input_modal').classList.remove('d-none');
}
function changeWastageModal(){  
    document.querySelector('.purchaseWastageDisplayModal').classList.add('d-none');
    document.querySelector('.purchaseWastage_input_modal').classList.remove('d-none');
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
            htmlClass:['text-success','fw-bold','snDisplay'],
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
            attr:{'name':'itemId'},
            text:''
        },
        option_div2_col2_row1:{
            el:'option',
            htmlClass:['itemNameForm'],
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
            htmlClass:['text-success','fw-bold','itemPurityDisplay'],
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
            text: document.querySelector('#purchaseWastage').value
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
            text: document.querySelector('#purchaseLabour').value
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
            text: document.querySelector('#fineSilver_inputModal').value
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
            text: document.querySelector('#labourCash_inputModal').value
        },
        //trial code 
        
        fineSilver_input:{
            el:'input',
            htmlClass:['d-none'],
            attr:{'name':'fineSilver','value':document.querySelector('#fineSilver_inputModal').value},
            text:''
        },
        labourCash_input:{
            el:'input',
            htmlClass:['d-none'],
            attr:{'name':'labourCash','value':document.querySelector('#labourCash_inputModal').value},
            text:''
        },
        itemWeight_input:{
            el:'input',
            htmlClass:['d-none'],
            attr:{'name':'itemWeight','value':document.querySelector('#itemWeight').value}
        },
        itemWastage_input:{
            el:'input',
            htmlClass:['d-none'],
            attr:{'name':'itemWastage','value':document.querySelector('#purchaseWastage').value}
        },
        itemPurchaseLabour_input:{
            el:'input',
            htmlClass:['d-none'],
            attr:{'name':'itemPurchaseLabour','value':document.querySelector('#purchaseLabour').value}
        },
       /* upDel_btn:{
            el:'button',
            htmlClass:['btn-sm', 'btn', 'btn-secondary', 'float-end'],
            attr:{'type':'button','onclick':'openUpDelModal()'},
            text:'U-D'
        }*/

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
   var itemWastage_input = createElement(table.itemWastage_input);
   appendElement(itemWastage_input,div1_col1_row2);
   var itemPurchaseLabour_input = createElement(table.itemPurchaseLabour_input);
   appendElement(itemPurchaseLabour_input,div2_col1_row2);
   /*var upDel_bt = createElement(table.upDel_btn);
   appendElement(upDel_bt,div1_col2_row1); */

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
        addMoreProductBtn();
      }
      return element.children.length;
  }

  function addMoreProductBtn(){
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
      document.querySelector('#netFineSilver').value = fineSilver_val;        
      document.querySelector('.netFineSilver').innerHTML = fineSilver_val;
      document.querySelector('.purchaseTable').querySelectorAll('input').forEach(e=>{
        if(e.getAttribute('name')==='labourCash'){
             purchaseLabour_val = purchaseLabour_val+parseFloat(e.getAttribute('value'));} });
       document.querySelector('#netPurchaseCash').value = purchaseLabour_val;     
      document.querySelector('.netPurchaseCash').innerHTML=purchaseLabour_val;
  }

  function editProductProcess(){
      if(document.querySelector('.purchaseTable').children.length<2){
          var li = document.createElement('li');
          li.classList.add('list-group-item','list-group-item-danger','text-danger','mb-2','p-2');
          li.appendChild(document.createTextNode('no product to edit !! '));
          document.querySelector('.purchaseTable').appendChild(li);
          setTimeout(()=>{
              document.querySelector('.purchaseTable').removeChild(li);
          },2000);
      }else{
          document.querySelector('.productListGroup').innerHTML = '';
          //console.log(document.querySelector('.purchaseTable').children.length);
          document.querySelector('.purchaseTable').querySelectorAll('select').forEach(e=>{
            //document.querySelector('.purchaseTable').removeChild(e.parentNode.parentNode.parentNode.parentNode);
            //console.log(e.innerHTML);
            var parentEl= e.parentNode.parentNode.parentNode.parentNode;
            var li={
                el:'li',
                htmlClass:['list-group-item', 'list-group-item-success', 'm-1','text-capitalize'],
                attr:{},
                text:`${parentEl.querySelector('.itemNameForm').innerHTML}-
                        purity: ${parentEl.querySelector('.itemPurityDisplay').innerHTML}`
            }
            var btn = {
                update:{
                    el:'button',
                    htmlClass:[ 'btn','btn-sm','btn-primary','fw-bold','float-end', 'mx-1','p-2'],
                    attr:{'onclick':'fetchDataUpdate(event)','data-id':e.value},
                    text:'Edit'
                },
                delete:{
                    el:'button',
                    htmlClass:['btn','btn-sm','btn-danger','mx-1','fw-bold','float-end','p-2'],
                    attr:{'onclick':'deleteProduct(event)','data-id':e.value},
                    text:'Del'
                }
            };
            var el = createElement(li);
            appendElement(el,document.querySelector('.productListGroup'));
            var delBtn = createElement(btn.delete);
            appendElement(delBtn,el);
            var upBtn = createElement(btn.update);
            appendElement(upBtn,el);
            
          });
          activateModal('#productListModal');
      }

  }

  function fetchDataUpdate(event){
      document.querySelector('.productListModalClose').click();//this closes the previous product list modal.
      //console.log(event.target.dataset.id);
      document.querySelector('.purchaseTable').querySelectorAll('select').forEach(e=>{
          if(e.value===event.target.dataset.id){
            document.querySelector('.purchaseTable').removeChild(e.parentNode.parentNode.parentNode.parentNode);
          };
      });
      updateCountSN();
      var url = `/apiPageRouter/getSelectedProduct/${event.target.dataset.id}`;
      fetchData(url,'product');
      activateModal('#staticBackdrop');
  }

  function deleteProduct(event){
    document.querySelector('.productListModalClose').click();//this closes the previous product list modal.
    //console.log(event.target.dataset.id);
    document.querySelector('.purchaseTable').querySelectorAll('select').forEach(e=>{
        if(e.value===event.target.dataset.id){
          document.querySelector('.purchaseTable').removeChild(e.parentNode.parentNode.parentNode.parentNode);
        };
    });
    updateCountSN();
  }

  function updateCountSN(){
      var i=0;
      document.querySelectorAll('.snDisplay').forEach(e=>{
          e.innerHTML = i++;
      });
  }

