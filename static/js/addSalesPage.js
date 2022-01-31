window.onload = ()=>{
    console.log('sales connected');
};

class salesProductList {
    constructor(SN,productId,itemName,itemPurity,saleLabour,saleWastage,itemWeight,fineSilver,labourCash){
        this.SN = SN;
        this.productId = productId;
        this.itemName = itemName;
        this.itemPurity = itemPurity;
        this.saleLabour = saleLabour;
        this.saleWastage =saleWastage;
        this.itemWeight = itemWeight;
        this.fineSilver = fineSilver;
        this.labourCash = labourCash;
    };
    insertInputDataToTable(){ 
        salesTableStructure(this);
        this.addProductToList();
    };
    addProductToList(){
        subTotal();
    };
    deleteProductFromList(){};
    updateProductFromList(){};
    countSN(){};

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
        if(this.inStock===0){
            var msg=`the stock quantity of the item is ${this.inStock}. (Zero)`; 
            warningModal.setWarningMsg(msg,'reminder');
        }else{
            document.querySelector('.modal-title').innerHTML = this.itemName;
            document.querySelector('.itemPurity').innerHTML = this.itemPurity;
            document.querySelector('.inStock').innerHTML = this.inStock;
            document.querySelector('#saleWastage').value = this.saleWastage;
            document.querySelector('.saleWastage_display').innerHTML = document.querySelector('#saleWastage').value;
            document.querySelector('#saleLabour').value = this.saleLabourMax;
            document.querySelector('.saleLabour_display').innerHTML= document.querySelector('#saleLabour').value;
            this.openProductModal();
        }
    },
    fetchProductData:function(){ 
        let url = `/apiPageRouter/getSelectedProduct/${this.productId}`;
        fetchData(url,'product');
    },
    isProductUnique:function(event,modalId){
        var isPresent =false;
        //this.productId = event.target.value;
        if(event.target.value===""){ //this block of if : is for updating the product list by onclick of edit of product 
            this.productId = event.target.dataset.id;
            document.querySelector('.salesTable').querySelectorAll('select').forEach(e=>{
                if(e.value===event.target.dataset.id){
                  document.querySelector('.salesTable').removeChild(e.parentNode.parentNode.parentNode.parentNode);
                };
            });
            document.querySelector('.productListModalClose').click();//this closes the previous product list modal.
            updateCountSN(document.querySelectorAll('.snDisplay'));
            subTotal();
        }
        else{ // this is original fetch of product details via onchange of product
            this.productId=event.target.value;
        }
        this.modalId = modalId;
        document.querySelector('.salesTable').querySelectorAll('select').forEach(e=>{  
            //select is only for the product id
            if(e.value===this.productId){
                //open a warning modal & return
                isPresent = !isPresent
                var msg=` the item is present in the list`; 
            warningModal.setWarningMsg(msg,'');   
            }   
        });
        if(!isPresent){
            this.fetchProductData();
        }    
    },
    openProductModal:function(){
        this.initializeModal();
        var btn = genericBtn()
        btn.removeAttribute('data-bs-target');
        btn.setAttribute('data-bs-target',this.modalId);
        btn.click();
    },
    initializeModal:function(){ 
        document.querySelector('.saveChangesBtn').setAttribute('disabled','true');
        this.calInStock = 0;
        this.netFineSilver = 0;
        this.netSaleCash = 0;
        document.querySelector('#itemWeight').value = 0;
        document.querySelector('.calInStock').innerHTML = this.calInStock;
        document.querySelector('#netFineSilverModal-input').value = this.netFineSilver;
        document.querySelector('.netFineSilverModal').innerHTML= document.querySelector('#netFineSilverModal-input').value ;
        document.querySelector('#netCashModal-input').value = this.netSaleCash;
        document.querySelector('.netCashModal').innerHTML = document.querySelector('#netCashModal-input').value;
        document.querySelector('.itemWeightErrorMsg').innerHTML = '';
        document.querySelector('.zeroStockReminder').classList.add('d-none');
    },
    editWastage:function(event){
        //console.log(event.target.tagName);
        if(event.target.tagName ==='SPAN'){
            document.querySelector('.saleWastage_displayDiv').classList.add('d-none');
            document.querySelector('.saleWastage_input').classList.remove('d-none');
        }else{
            document.querySelector('.saleWastage_displayDiv').classList.remove('d-none');
            document.querySelector('.saleWastage_input').classList.add('d-none');
            document.querySelector('.saleWastage_display').innerHTML = document.querySelector('#saleWastage').value;
            this.saleWastage = document.querySelector('#saleWastage').value;
            this.calculateNetFineSilver();
        }
    },
    editLabour:function(event){
        console.log(event.target.tagName);
        if(event.target.tagName ==='SPAN'){
            document.querySelector('.saleLabour_displayDiv').classList.add('d-none');
            document.querySelector('.saleLabour_input').classList.remove('d-none');
        }else{
            document.querySelector('.saleLabour_displayDiv').classList.remove('d-none');
            document.querySelector('.saleLabour_input').classList.add('d-none');
            document.querySelector('.saleLabour_display').innerHTML = document.querySelector('#saleLabour').value;
            this.saleLabourMax = document.querySelector('#saleLabour').value;
            this.calculateNetSaleCash();
        }  
    },
    calculateNetFineSilver:function(){
        this.netFineSilver = parseFloat(this.itemWeight)*(parseFloat(this.itemPurity)+parseFloat(this.saleWastage))/100;
        document.querySelector('#netFineSilverModal-input').value = parseFloat(this.itemWeight)*(parseFloat(this.itemPurity)+parseFloat(this.saleWastage))/100;
        document.querySelector('.netFineSilverModal').innerHTML = document.querySelector('#netFineSilverModal-input').value;  
    },
    calculateNetSaleCash:function(){
        this.netSaleCash = parseFloat(this.itemWeight)*parseFloat(this.saleLabourMax)/1000;
        document.querySelector('#netCashModal-input').value = parseFloat(this.itemWeight)*parseFloat(this.saleLabourMax)/1000;
        document.querySelector('.netCashModal').innerHTML = document.querySelector('#netCashModal-input').value;
    },
    calculateStock:function(){  
        this.calInStock = parseFloat(this.inStock)-parseFloat(this.itemWeight);     
        document.querySelector('.calInStock').innerHTML = this.calInStock;
        this.calculateNetFineSilver();
        this.calculateNetSaleCash();
        if(this.calInStock===parseFloat(0)){
            document.querySelector('.zeroStockReminder').classList.remove('d-none');
        }else{
            document.querySelector('.zeroStockReminder').classList.add('d-none');
        }
    },
    itemWeightControl:function(event){
        this.itemWeight = event.target.value;
        if(parseFloat(this.inStock)-parseFloat(this.itemWeight)<0){
            document.querySelector('.itemWeightErrorMsg').innerHTML =`max weight allowed ${this.inStock}`;
            document.querySelector('.saveChangesBtn').setAttribute('disabled','true');
            return;
        }else if(parseFloat(this.itemWeight)<=0){
            document.querySelector('.itemWeightErrorMsg').innerHTML =`weight cannot be 0 or less than 0`;
            document.querySelector('.saveChangesBtn').setAttribute('disabled','true');
            return;
        }
        else if(document.querySelector('#itemWeight').value===''){
            document.querySelector('.itemWeightErrorMsg').innerHTML =`please enter a valid number`;
            document.querySelector('.saveChangesBtn').setAttribute('disabled','true');
            return;
        }
        else{
            if(document.querySelector('.saveChangesBtn').getAttribute('disabled')){
                document.querySelector('.saveChangesBtn').removeAttribute('disabled');
                document.querySelector('.itemWeightErrorMsg').innerHTML ='';
            }
            this.calculateStock();
        }
    },
    transferModalData:function(){
        let productDetail = new salesProductList(
            countSN(),this.productId,this.itemName,this.itemPurity,this.saleLabourMax,this.saleWastage,this.itemWeight,
            this.netFineSilver,this.netSaleCash
        );
        productDetail.insertInputDataToTable();
    }
};

function countSN(){ //since the table struct is created before the call to SN() therefore it gives and added length
    // therefore we return --len for the exact value ....
    var len =  document.querySelector('.salesTable').children.length;
    return len;
}

function subTotal(){
    var netFineSilver = 0;
    var netSaleCash = 0;
    Array.from(document.querySelectorAll('input')).filter(el=>el.getAttribute('name')==='fineSilver').forEach(e=>{
        netFineSilver = netFineSilver+parseFloat(e.value);
    });
    Array.from(document.querySelectorAll('input')).filter(el=>el.getAttribute('name')==='labourCash').forEach(e=>{
        netSaleCash =netSaleCash+parseFloat(e.value);
    });
    console.log(netSaleCash,netFineSilver);
    document.querySelector('#netFineSilver').value = netFineSilver;
    document.querySelector('.netFineSilver').innerHTML = document.querySelector('#netFineSilver').value;
    document.querySelector('#netSaleCash').value = netSaleCash;
    document.querySelector('.netSaleCash').innerHTML = document.querySelector('#netSaleCash').value ;
}

var warningModal = {
    warningMsg:'',
    modalId:'#warningModal',
    reminderMsg:'', // this is either '' or 'reminder' --> if 'reminder' then reminder is present in the warning modal
    //else its not present we hide the display of reminder click ....
    setWarningMsg:function(warningMsg,reminderMsg){
        this.warningMsg = warningMsg;
        this.reminderMsg = reminderMsg;
        this.insertMsg();
    },
    insertMsg:function(){
        if(this.reminderMsg===''){
            document.querySelector('.reminderWarningModal').classList.add('d-none');
        }else{
            document.querySelector('.reminderWarningModal').classList.remove('d-none');
        }
        document.querySelector('.warning-modal-body').innerHTML = this.warningMsg;
        this.openModal();
    },
    openModal:function(){
        var btn = genericBtn()
            btn.removeAttribute('data-bs-target');
            btn.setAttribute('data-bs-target',this.modalId);
            btn.click();
    }
}

function genericBtn(){ // this button calls the modal with different data-bs-target.
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

function salesTableStructure(productDetail)  {
    /*div -- container row col-2 col-6 col-4 
    text -- text-secondary form-text 
    input --- d-none name 
    select -- d-none name 
    option -- value 
    textnodes */ 
    
   var table = { 
    top_container:{
        el:'div',
        htmlClass:['container','text-secondary','mt-1','text-capitalize'],
        attr:{},
        text:''
    },
    row_div:{
        el:'div',
        htmlClass:['row','border','border-secondary'],
        attr:{},
        text:''
    },
    col2_div:{
        el:'div',
        htmlClass:['col-2','border-end','border-secondary'],
        attr:{},
        text:''
    },
    col6_div:{
        el:'div',
        htmlClass:['col-6','border-end','border-secondary'],
        attr:{},
        text:''
    },
    col4_div:{
        el:'div',
        htmlClass:['col-4'],
        attr:{},
        text:''
    },
    col4_div_border:{
        el:'div',
        htmlClass:['col-4','border-end','border-secondary'],
        attr:{},
        text:''
    },
    col12_div:{
        el:'div',
        htmlClass:['col-12'],
        attr:{},
        text:''
    },
    input:{
        el:'input',
        htmlClass:['d-none'],
        attr:{'name':'','type':'number','step':'any','value':0},
        text:''
    },
    select:{
        el:'select',
        htmlClass:['d-none'],
        attr:{'name':'productId'},
        text:''
    },
    option:{
        el:'option',
        htmlClass:[],
        attr:{'value':'','selected':'true'},
        text:''
    },
    span_text:{
        el:'span',
        htmlClass:['form-text'],
        attr:{},
        text:''
    },
    span_value:{
        el:'span',
        htmlClass:['fw-bold','text-success'],
        attr:{},
        text:''
    },
};
    /*setHtmlClass:function(){},
    setAttr:function(){},
    setText:function(element,text){
        this.element.text = text;
    },
    createTable:function(){ */
        //top_container
        var container = createElement(table.top_container);
        appendElement(container,document.querySelector('.salesTable'));
        //1st row
        var row1 = createElement(table.row_div);
        appendElement(row1,container);
        //row1-col1
        var row1_col1 = createElement(table.col2_div);
        appendElement(row1_col1,row1);
        //row1-col1-div1
        var row1_col1_div1 = createElement(table.col12_div);
        appendElement(row1_col1_div1,row1_col1);
        //row1-col1-div1-span_text
        setText(table.span_text,'s.n');
        var row1_col1_div1_span = createElement(table.span_text);
        appendElement(row1_col1_div1_span,row1_col1_div1);
        //row1_col1_div2
        var row1_col1_div2 = createElement(table.col12_div);
        appendElement(row1_col1_div2,row1_col1);
        //row1_col1_div2_span_display
        setHtmlClass(table.span_value,'snDisplay')
        setText(table.span_value,productDetail.SN);
        var row1_col1_div2_span_display = createElement(table.span_value);
        appendElement(row1_col1_div2_span_display,row1_col1_div2);
        //row1-col2
        var row1_col2 = createElement(table.col6_div);
        appendElement(row1_col2,row1);
        //row1-col2-div1
        var row1_col2_div1 = createElement(table.col12_div);
        appendElement(row1_col2_div1,row1_col2);
        //row1_col2_div1_span_text
        setText(table.span_text,'item name');
        var row1_col2_div1_span_text = createElement(table.span_text);
        appendElement(row1_col2_div1_span_text,row1_col2_div1);
        //row1_col2_div2
        var row1_col2_div2 = createElement(table.col12_div);
        appendElement(row1_col2_div2,row1_col2);
        //row1_col2_div2_span_display
            //select & option 
            setAttr(table.option,'value',productDetail.productId);
            var select = createElement(table.select);
            appendElement(select,row1_col2_div2);
            var option = createElement(table.option);
            appendElement(option,select);
            //console.log(select);//omit
        setHtmlClass(table.span_value,'itemName-table-display');
        setText(table.span_value,productDetail.itemName);
        var row1_col2_div2_span_display = createElement(table.span_value);
        appendElement(row1_col2_div2_span_display,row1_col2_div2);
            //row1-col3
        var row1_col3 = createElement(table.col4_div);
        appendElement(row1_col3,row1);
        //row1_col3_div1
        var row1_col3_div1 = createElement(table.col4_div);
        appendElement(row1_col3_div1,row1_col3);
        //row1_col3_div1_span_display
        setText(table.span_text,'item purity.');
        var row1_col3_div1_span_display = createElement(table.span_text);
        appendElement(row1_col3_div1_span_display,row1_col3_div1);
        //row1_col3_div2
        var row1_col3_div2 = createElement(table.col4_div);
        appendElement(row1_col3_div2,row1_col3);
        //row1_col3_div2_span_display
            //item purity input
            setAttr(table.input,'name','itemPurity');
            setAttr(table.input,'value',productDetail.itemPurity);
            var itemPurity_input = createElement(table.input);
            appendElement(itemPurity_input,row1_col3_div2); 
            //console.log(itemPurity_input);
        setHtmlClass(table.span_value,'itemPurity-table-display');
        setText(table.span_value,productDetail.itemPurity);
        var row1_col3_div2_span_display = createElement(table.span_value);
        appendElement(row1_col3_div2_span_display,row1_col3_div2);
        //row2
        var row2 = createElement(table.row_div);
        appendElement(row2,container);
        //row2_col1
        var row2_col1 = createElement(table.col4_div_border);
        appendElement(row2_col1,row2);
        //row2_col1_div1
        var row2_col1_div1 = createElement(table.col12_div);
        appendElement(row2_col1_div1,row2_col1);
        //row2_col1_div1_span_text
        setText(table.span_text,'sale wastage ');
        var row2_col1_div1_span_text = createElement(table.span_text);
        appendElement(row2_col1_div1_span_text,row2_col1_div1);
        //row2_col1_div1_span_value
            //sale wastage input
            setAttr(table.input,'name','saleWastage');
            setAttr(table.input,'value',productDetail.saleWastage);
            var saleWastage_input = createElement(table.input);
            appendElement(saleWastage_input,row2_col1_div1);
        setHtmlClass(table.span_value,'saleWastage-table-display');
        setText(table.span_value,productDetail.saleWastage);
        var row2_col1_div1_span_value = createElement(table.span_value);
        appendElement(row2_col1_div1_span_value,row2_col1_div1);
        //row2_col1_div2
        var row2_col1_div2 = createElement(table.col12_div);
        appendElement(row2_col1_div2,row2_col1);
        //row2_col1_div2_span_text
        setText(table.span_text,'Sale labour ');
        var row2_col1_div2_span_text = createElement(table.span_text);
        appendElement(row2_col1_div2_span_text,row2_col1_div2);
        //row2_col1_div2_span_value
            //sale labour input
            setAttr(table.input,'name','saleLabour');
            setAttr(table.input,'value',productDetail.saleLabour);
            var saleLabour_input = createElement(table.input);
            appendElement(saleWastage_input,row2_col1_div2);
        setHtmlClass(table.span_value,'saleLabour-table-display');
        setText(table.span_value,productDetail.saleLabour);
        var row2_col1_div2_span_value=createElement(table.span_value);
        appendElement(row2_col1_div2_span_value,row2_col1_div2);
        //row2_col2
        var row2_col2 = createElement(table.col4_div_border);
        appendElement(row2_col2,row2);
        //row2_col2_div1
        var row2_col2_div1 = createElement(table.col12_div);
        appendElement(row2_col2_div1,row2_col2);
        //row2_col2_div1_span_text
        setText(table.span_text,'item weight.');
        var row2_col2_div1_span_text= createElement(table.span_text);
        appendElement(row2_col2_div1_span_text,row2_col2_div1);
        //row2_col2_div2
        var row2_col2_div2 = createElement(table.col12_div);
        appendElement(row2_col2_div2,row2_col2);
        //row2_col2_div2_span_value
            //item weight input
            setAttr(table.input,'name','itemWeight');
            setAttr(table.input,'value',productDetail.itemWeight);
            var itemWeight_input = createElement(table.input);
            appendElement(itemWeight_input,row2_col2_div2);
        setHtmlClass(table.span_value,'itemWeight-table-display');
        setText(table.span_value,productDetail.itemWeight);
        var row2_col2_div2_span_value = createElement(table.span_value);
        appendElement(row2_col2_div2_span_value,row2_col2_div2);
        //row2_col3
        var row2_col3 = createElement(table.col4_div);
        appendElement(row2_col3,row2);
        //row2_col3_div1
        var row2_col3_div1 = createElement(table.col12_div);
        appendElement(row2_col3_div1,row2_col3);
        //row2_col3_div1_span_text
        setText(table.span_text,'Fine Silver ');
        var row2_col3_div1_span_text = createElement(table.span_text);
        appendElement(row2_col3_div1_span_text,row2_col3_div1);
        //row2_col3_div1_span_value
            //fine silver input 
            setAttr(table.input,'name','fineSilver');
            setAttr(table.input,'value',productDetail.fineSilver);
            var fineSilver_input = createElement(table.input);
            appendElement(fineSilver_input,row2_col3_div1);
        setHtmlClass(table.span_value,'fineSilver-table-display');
        setText(table.span_value,productDetail.fineSilver);
        var row2_col3_div1_span_value = createElement(table.span_value);
        appendElement(row2_col3_div1_span_value,row2_col3_div1);
        //row2_col3_div2
        var row2_col3_div2 = createElement(table.col12_div);
        appendElement(row2_col3_div2,row2_col3);
        //row2_col3_div2_span_text
        setText(table.span_text,'labour cash ');
        var row2_col3_div2_span_text = createElement(table.span_text);
        appendElement(row2_col3_div2_span_text,row2_col3_div2);
        //row2_col3_div2_span_value
            //labour cash input
            setAttr(table.input,'name','labourCash');
            setAttr(table.input,'value',productDetail.labourCash);
            var labourCash_input = createElement(table.input);
            appendElement(labourCash_input,row2_col3_div2);
        setHtmlClass(table.span_value,'labourCash-table-display');
        setText(table.span_value,productDetail.labourCash);
        var row2_col3_div2_span_value = createElement(table.span_value);
        appendElement(row2_col3_div2_span_value,row2_col3_div2);


    /*}*/
};

    function setHtmlClass(element,class_){
        /*
         span_value:{ //aka  span_display the value will be dsplayed
        el:'span',
        htmlClass:['fw-bold','text-success'],
        attr:{},
        text:''
    },
        //this functo specefically sets the class of span_display to acces the element to insert the product data
        // on exiting the product modal 
        //the class list is 2 and the 3rd class in the span_display will be the element identifier class
        //there in order to make it unique we have to pop the last element frm the htmlClass od span_display 
        //to add new element identifier class.
        */
        if(element.htmlClass.length===3){
            element.htmlClass.pop();
        }
        element.htmlClass.push(class_);
    }

    function setAttr(element,attr_type,attr_val){
        if(attr_type==='name'){
            element.attr.name = attr_val;
        }else if(attr_type==='value'){
            element.attr.value=attr_val;
        }
        

    }

    function setText(element,text){
        element.text = text;
    }

    //edit product

    function editProductProcess(){
        if(document.querySelector('.salesTable').children.length<2){
            var li = document.createElement('li');
            li.classList.add('list-group-item','list-group-item-danger','text-danger','mb-2','p-2');
            li.appendChild(document.createTextNode('no product to edit !! '));
            document.querySelector('.salesTable').appendChild(li);
            setTimeout(()=>{
                document.querySelector('.salesTable').removeChild(li);
            },2000);
        }else{
            document.querySelector('.productListGroup').innerHTML = '';
            //console.log(document.querySelector('.purchaseTable').children.length);
            document.querySelector('.salesTable').querySelectorAll('select').forEach(e=>{
              //document.querySelector('.purchaseTable').removeChild(e.parentNode.parentNode.parentNode.parentNode);
              //console.log(e.innerHTML);
              var parentEl= e.parentNode.parentNode.parentNode.parentNode;
              var li={
                  el:'li',
                  htmlClass:['list-group-item', 'list-group-item-success', 'm-1','text-capitalize'],
                  attr:{},
                  text:`${parentEl.querySelector('.itemName-table-display').innerHTML}-
                          purity: ${parentEl.querySelector('.itemPurity-table-display').innerHTML}`
              }
              var btn = {
                  update:{
                      el:'button',
                      htmlClass:[ 'btn','btn-sm','btn-primary','fw-bold','float-end', 'mx-1','p-2'],
                      attr:{'onclick':"productModal.isProductUnique(event,'#saleProductModal')",'data-id':e.value},
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
            var btn = genericBtn()
            btn.removeAttribute('data-bs-target');
            btn.setAttribute('data-bs-target','#productListModal');
            btn.click();
        }
  
    }

    function deleteProduct(event){
        document.querySelector('.productListModalClose').click();//this closes the previous product list modal.
        //console.log(event.target.dataset.id);
        document.querySelector('.salesTable').querySelectorAll('select').forEach(e=>{
            if(e.value===event.target.dataset.id){
              document.querySelector('.salesTable').removeChild(e.parentNode.parentNode.parentNode.parentNode);
            };
        });
        updateCountSN(document.querySelectorAll('.snDisplay'));
        subTotal();
      }

      function updateCountSN(element){
        var i=0;
        element.forEach(e=>{ 
            e.innerHTML = ++i;
        });
    }
  
    
  











