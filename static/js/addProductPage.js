window.onload = ()=>{
    console.log('js connect');
};

function displayItemByPiece(){
    var hide = document.getElementsByClassName('itemByWeight');
    for(var i=0;i<hide.length;i++){
        hide[i].classList.add('d-none');
        if(hide[i].getAttribute('input')){
            hide[i].querySelector('input').setAttribute('disabled');
         }
        
    }
    var show = document.getElementsByClassName('itemByPiece');
    for(var i=0;i<show.length;i++){
        show[i].classList.remove('d-none');
        
        
    }
}

function displayItemByWeight(){
    var hide = document.getElementsByClassName('itemByPiece');
    for(var i=0;i<hide.length;i++){
        hide[i].classList.add('d-none');
        if(hide[i].getAttribute('input')){
            hide[i].querySelector('input').setAttribute('disabled');
        }
       
    }
    var show = document.getElementsByClassName('itemByWeight');
    for(var i=0;i<show.length;i++){
        show[i].classList.remove('d-none');
        if(show[i].getAttribute('input')){
            show[i].querySelector('input').removeAttribute('disabled');
        }
    }
}