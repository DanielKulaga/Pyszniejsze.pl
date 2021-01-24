function checkCode() {

var code = document.getElementById("searchCode").value;
if(code == "ab2345"){
  window.location.href = 'summary_window.html';
} else {
  $(document).ready(function(){
  $('#alertbox').click(function(){
    $("#error").html("You Clicked on Click here Button");
      $('#wrongCode').modal("show");
    });
  });
}
}

  var input = document.getElementById("restaurantName");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("restBtn").click();
    }
  });
