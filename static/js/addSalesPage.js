window.onload = ()=>{
    console.log('sales connected');
   // genericBtn();
};

var client = {
    clientId:"",
    fineSilverStatus:0,
    cashStatus:0,
    clientType:'',
    setClientData:function(data){
        this.fineSilverStatus = data.paymentStatusSilver;
        this.cashStatus = data.paymentStatusCash;
        this.clientType = data.clientType;
        this.onSelectClient();
    },
    setClientId:function(event){
        this.clientId=event.target.value;
        this.fetchClientData();
    },
    onSelectClient:function(){
        document.querySelector('.clientType').innerHTML = this.clientType;
        if(this.fineSilverStatus<0){
            document.querySelector('.fineSilverStatus').classList.remove('text-danger');
            document.querySelector('.fineSilverStatus').innerHTML=this.fineSilverStatus;
        }else{
            document.querySelector('.fineSilverStatus').classList.add('text-danger')
            document.querySelector('.fineSilverStatus').innerHTML=this.fineSilverStatus;
        }
        if(this.paymentStatusCash<0){
            document.querySelector('.fineSilverStatus').classList.remove('text-danger');
            document.querySelector('.cashStatus').innerHTML=this.cashStatus;
        }else{
           document.querySelector('.cashStatus').classList.add('text-danger');
            document.querySelector('.cashStatus').innerHTML=this.cashStatus;
        }
        document.querySelector('.clientDataDiv').classList.remove('d-none');
    },
    onAddingProduct:function(netFineSilver,netSaleCash){
        document.querySelector('.calFineSilver').innerHTML = netFineSilver+this.fineSilverStatus;
        document.querySelector('.calCashStatus').innerHTML = netSaleCash+this.cashStatus;
    },
    fetchClientData:function(){
        var url = `/apiPageRouter/getSelectedClient/${this.clientId}`;
        fetchData(url,'client');
    }
};

/*function processClient(event){
    var clientId=event.target.value;
    client.clientId = clientId;
    client.onSelectClient();
}*/
var product ={

};

var productModal ={
    productId:'',
    itemPurity:0,
    saleWastage:0,
    saleLabourMax:0,
    saleLabourMin:0,
    itemName:'',
    inStock:0,
    netFineSilver:0,
    netSaleCash:0,
    itemWeight:0,
    modalId:'',
    itemWeight:0,
    calInStock:0,
    /*deleteModalBtn:function(){
        
    },
    createModalBtn:function(){},*/
    setModalDataVariables:function(data){
        console.log(data);
        this.itemPurity = data.itemPurity;
        this.inStock = data.inStockQuantity;
        this.itemName = data.itemName;
        this.saleLabourMax=data.saleLabourMax;
        this.saleLabourMin = data.saleLabourMin;
        this.saleWastage = data.purchasePurity+data.salePurity;
        this.insertDataInModal();
    },
    insertDataInModal:function(){
        //console.log(this.modalId);
        document.querySelector('.modal-title').innerHTML = this.itemName;
        document.querySelector('.itemPurity').innerHTML = this.itemPurity;
        document.querySelector('.inStock').innerHTML = this.inStock;
        document.querySelector('#saleWastage').value = this.saleWastage;
        document.querySelector('.saleWastage_display').innerHTML = document.querySelector('#saleWastage').value;
        document.querySelector('#saleLabour').value = this.saleLabourMax;
        document.querySelector('.saleLabour_display').innerHTML= document.querySelector('#saleLabour').value;
        this.openProductModal();
        
    },
    fetchProductData:function(){ 
        let url = `/apiPageRouter/getSelectedProduct/${this.productId}`;
        fetchData(url,'product');
    },
    isProductUnique:function(event,modalId){ //console.log('here');
        this.productId = event.target.value;
        this.modalId = modalId;
        document.querySelector('.salesTable').querySelectorAll('select').forEach(e=>{  //console.log('here2')
            //select is only for the product id
            if(e.value===this.productId){
                //open a warning modal & return
            }
            
        });this.fetchProductData();
    },
    openProductModal:function(){
        //this.inserDataInModal();
        this.initializeModal();
        var btn = genericBtn()
        btn.removeAttribute('data-bs-target');
        btn.setAttribute('data-bs-target',this.modalId);
        //console.log(btn);
        btn.click();
    },
    initializeModal:function(){ console.log(this.netFineSilver);
        document.querySelector('#itemWeight').value = 0;
        document.querySelector('.calInStock').innerHTML = this.calInStock;
        document.querySelector('#netFineSilverModal-input').value = this.netFineSilver;
        document.querySelector('.netFineSilverModal').innerHTML= document.querySelector('#netFineSilverModal-input').value ;
        document.querySelector('#netCashModal-input').value = this.netSaleCash;
        document.querySelector('.netCashModal').innerHTML = document.querySelector('#netCashModal-input').value;
    },
    editWastage:function(){},
    editLabour:function(){},
    calculateNetFineSilver:function(){
        document.querySelector('#netFineSilverModal-input').value = parseFloat(this.itemWeight)*(parseFloat(this.itemPurity)+parseFloat(this.saleWastage))/100;
        document.querySelector('.netFineSilverModal').innerHTML = document.querySelector('#netFineSilverModal-input').value;
    },
    calculateNetSaleCash:function(){},
    calculateStock:function(event){
        this.itemWeight = event.target.value;
        document.querySelector('.calInStock').innerHTML = parseFloat(this.inStock)-parseFloat(this.itemWeight);
        this.calculateNetFineSilver();
    },
    transferModalData:function(){}

};

var warningModal = {
    warningMsg:'',
    setWarningMsg:function(warningMsg){
        this.warningMsg = warningMsg;
    }
}

function genericBtn(){
    var btn = {
        el:'button',
        htmlClass:['d-none','genericBtn'],
        attr:{'type':"button", 'class':"btn btn-primary", 'data-bs-toggle':"modal", 'data-bs-target':'none'}
    };
    var btnEl =createElement(btn);
    appendElement(btnEl,document.querySelector('.modalBtn'));
    return btnEl;
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


function fetchData(url,identifier){
    fetch(url).then(
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
                productModal.setModalDataVariables(data); //this func inserts data into modal from fetched data.......  
             }
             if(identifier==='client'){
                client.setClientData(data);
             }
            });
          }
    ).catch(err=>{
        console.log(err);
    });
}
