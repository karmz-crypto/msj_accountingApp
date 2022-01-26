window.onload = ()=>{
    console.log('sales connected');
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
                insertDataIntoModal(data); //this func inserts data into modal from fetched data.......  
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
