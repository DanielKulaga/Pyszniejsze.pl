$(document).ready(function(){
$('#numerKarty').mask('00-0000-0000-0000-0000-0000');
$('#dataWaznosci').mask('00/00');
$('#cvv').mask('000');
});


//funkcja do usuwania opinii
function disableOpinion(){


    if(document.getElementById("opinionInput").value.length > 0){
    document.getElementById("opinionInput").setAttribute("disabled","true");

    }

  }
//funkcja do disablowania buttona
function disableButton(){
  document.getElementById("sendOpinion").setAttribute("disabled","true");
}


function disableButtonTip(){
  document.getElementById("sendTip").setAttribute("disabled","true");
}





window.localStorage.clear();
