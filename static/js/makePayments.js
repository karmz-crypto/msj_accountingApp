window.onload = ()=>{
    console.log('make payment js connect');
};

var paymentModal = {
    tunchNumber:'',
    tunch:0,
    weight:0,
    fineSilverWeight:0,
    cashAmount:0,
    silverBhaw:0,
    rtgsNumber:'',
    chequeNumber:'',
    modalTitle:'',
    initializeData:function(){
        this.tunch=0;
        this.weight=0;
        this.fineSilverWeight=0;
        this.cashAmount=0;
        this.modalTitle='';
        this.cashType='';
        document.querySelector('.choursaBullion').classList.add('d-none');
        document.querySelector('.pureBullion').classList.add('d-none');
        document.querySelector('.cash').classList.add('d-none');
        document.querySelector('.bullionData').classList.add('d-none');
        document.querySelector('.bankCashData').classList.add('d-none');
        document.querySelector('.officeCashData').classList.add('d-none');
        //console.log('initialize');
    },
    insertDataIntoModal:function(){
        console.log(this.modalTitle);
        document.querySelector('.modal-title').innerHTML = this.modalTitle;
        document.querySelector('#cash-type').value = this.cashType;
        this.openModal();
    },
    openModal:function(){
        document.querySelector('.modalBtn').click();
    },
    onSelectCash:{
        onSelectRtgs:function(){
            paymentModal.initializeData();
            paymentModal.cashType = 'RTGS/UPI';
            paymentModal.modalTitle = 'cash payment';
            document.querySelector('.cash').classList.remove('d-none');
            document.querySelector('.bankCashData').classList.remove('d-none');
            paymentModal.insertDataIntoModal();
        },
        onSelectCash:function(){},
        onSelectCheque:function(){}
    },
    onSelectBullion:{
        onSelectChoursa:function(){
            paymentModal.initializeData();
            paymentModal.modalTitle="choursa entry";
            //console.log('choursa');
            document.querySelector('.choursaBullion').classList.remove('d-none');
            document.querySelector('.bullion').classList.remove('d-none');
            paymentModal.insertDataIntoModal();
            
        },
        onSelect9999:function(){}
    }


};


