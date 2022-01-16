window.onload = ()=>{
    console.log('js connect');
    document.querySelectorAll('.itemByWeight').forEach(e=>{
        e.querySelectorAll('input').forEach(e=>{
            e.setAttribute('required','true');
        });
    });
    document.querySelectorAll('.itemByPiece').forEach(e=>{
        e.classList.add('d-none');
        e.querySelectorAll('input').forEach(e=>{
            e.setAttribute('disabled','true');
        });
    });
};

function displayItemByPiece(event){
    event.target.classList.remove('btn-warning');
    event.target.classList.add('btn-primary');
    document.querySelector('#displayItemByWeight').classList.remove('btn-primary');
    document.querySelector('#displayItemByWeight').classList.add('btn-warning');
    document.querySelector('.itemByWeightRadio').classList.add('d-none');
    document.querySelectorAll('.itemByWeightRadio').forEach(e=>{
        e.querySelectorAll('input').forEach(e=>{e.setAttribute('disabled','true');});
        e.querySelectorAll('input').forEach(e=>{e.removeAttribute('required');});
    });


    var hide = document.getElementsByClassName('itemByWeight');
    for(var i=0;i<hide.length;i++){
       hide[i].classList.add('d-none');
        if(hide[i].querySelector('input')){ 
            hide[i].querySelector('input').setAttribute('disabled','true');
            hide[i].querySelector('input').removeAttribute('required');
         }
        
    }
    var show = document.getElementsByClassName('itemByPiece');
    for(var i=0;i<show.length;i++){
       show[i].classList.remove('d-none');
       if(show[i].querySelector('input')){
        show[i].querySelector('input').setAttribute('required','true');
        show[i].querySelector('input').removeAttribute('disabled');
       }
        
        
    }
}

function displayItemByWeight(event){

    event.target.classList.remove('btn-warning');
    event.target.classList.add('btn-primary');
    document.querySelector('#displayItemByPiece').classList.remove('btn-primary');
    document.querySelector('#displayItemByPiece').classList.add('btn-warning');

    document.querySelector('.itemByWeightRadio').classList.remove('d-none');
    document.querySelectorAll('.itemByWeightRadio').forEach(e=>{
        e.querySelectorAll('input').forEach(e=>{e.setAttribute('required','true');});
        e.querySelectorAll('input').forEach(e=>{e.removeAttribute('disabled');});
    });
    
    var hide = document.getElementsByClassName('itemByPiece');
    for(var i=0;i<hide.length;i++){
       hide[i].classList.add('d-none');
        if(hide[i].querySelector('input')){
            hide[i].querySelector('input').setAttribute('disabled','true');
            hide[i].querySelector('input').removeAttribute('required');
        }
       
    }
    var show = document.getElementsByClassName('itemByWeight');
    for(var i=0;i<show.length;i++){
       show[i].classList.remove('d-none');
        if(show[i].querySelector('input')){
            show[i].querySelector('input').removeAttribute('disabled');
            show[i].querySelector('input').setAttribute('required','true');
        }
    }
}

function disableItemWeightQuantity(event){
    if(event.target.value==='true'){
        document.querySelector('#itemQuantityWeight').setAttribute('disabled','true');
        document.querySelector('#itemQuantityWeight').removeAttribute('required');
        document.querySelector('.labourPerPiece').classList.add('d-none');
    }else{
        document.querySelector('#itemQuantityWeight').setAttribute('required','true');
        document.querySelector('#itemQuantityWeight').removeAttribute('disabled');
        document.querySelector('.labourPerPiece').classList.remove('d-none');
    }
}

// form control and form related displays

function formControl(event,formIdentifier){


}

function formMsg(e,inputIdentifier){
    if(inputIdentifier==='name'){ 
        var msg = nameFormMsg();} //returns a string format msg 
        
    if(inputIdentifier==='itemPurity'){
        var msg = itemPurityFormMsg(e);
    }

    if(e.target.parentElement.querySelector('.formMsg')){
        return ;
     }
    var el = createHtmlElement('div'); console.log(el);
    innerHtmlText(msg,el);
    insertAfter(e.target,el);

}

function innerHtmlText(msg,el){
    el.innerHTML = msg;
}

function formError(e,inputIdentifier){
    if(inputIdentifier==='name'){
        var msg = nameFormError(e);
        var el = e.target.nextSibling;
        innerHtmlText(msg,el);
    }
    if(inputIdentifier==='itemPurity'){
        var msg = itemPurityFormError(e);
        var el = e.target.nextSibling;
        innerHtmlText(msg,el);

    }
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

function createHtmlElement(el){
    var el = document.createElement(el);
    el.classList.add('text-capitalize','form-text','text-success','fw-bold','formMsg');
    return el ;
}  
  
 function nameFormMsg(){
     return '*mandatory field'
 }

 function nameFormError(e){ 
    var regName =/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    if(!regName.test(e.target.value)){
        return 'Invalid name given.';
    }
     else{
         e.target.parentElement.querySelector('.formMsg').remove();
     }
     
 }

 function itemPurityFormMsg(e){
         return 'Purity must be between 0-100 %';
 }

 function itemPurityFormError(e){
     if(e.target.value<0||e.target.value>100){
         return 'an invalid entry !!'
     }
     else if(e.target.value===""){
        return 'form must be filled'
     }
     else{
        e.target.parentElement.querySelector('.formMsg').remove();
 
     }
 }

 //form control ends here ....