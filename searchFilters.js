window.onbeforeunload = function() {
         //unchecked your check box here.
      $("input[type='checkbox']").prop('checked', false);
      $("input[type='radio']").prop('checked', false);
 };
firstLoad();
chechedRadioButton();
checkedSortButton();
checkedTypeOfRestauratButton();


function firstLoad(){
  $("input[name=sortuj][value='none']").prop("checked",true);
  $("input[name=dostawa][value='none']").prop("checked",true);
  $("input[name=wszystkie][value='wszystkie']").prop("checked",true);
  localStorage.setItem('deliveryCost', 'none');
  localStorage.setItem('SortBy', 'none');
  localStorage.setItem('Type', 'wszystkie');

}

function chechedRadioButton(){
  var rad = document.myForm.dostawa;
  var prev = null;
  for (var i = 0; i < rad.length; i++) {
      rad[i].addEventListener('change', function() {
          localStorage.setItem('deliveryCost', this.value);
          console.log(this.value);
      });
  }
}
function checkedSortButton(){
  var rad = document.myForm2.sortuj;
  var prev = null;
  for (var i = 0; i < rad.length; i++) {
      rad[i].addEventListener('change', function() {
          localStorage.setItem('SortBy', this.value);
          console.log(this.value);
      });
  }
}

function checkedTypeOfRestauratButton(){

  var selected = new Array();
  var kuchnie = document.getElementById("kuchnie");
  var chks = kuchnie.getElementsByTagName("INPUT");
  console.log(chks.length);
  for (var i=0; i<chks.length; i++){
    chks[i].addEventListener('change', function() {
      console.log(this.value);
      //if (this.value !=  ){
  if (this.value != 'wszystkie'){
    $("input[name=wszystkie][value='wszystkie']").prop("checked",false);
    if (selected.includes(this.value) == false){
      selected.push(this.value);
      localStorage.setItem('Type', selected);
    }else {
      for( var i = 0; i < chks.length; i++){
      if ( selected[i] === this.value) {
          selected.splice(i, 1);
          localStorage.setItem('Type', selected);
      }
  }
    }
  } else {
    $("input[name=wloska][value='wloska']").prop("checked",false);
    $("input[name=domowa][value='domowa']").prop("checked",false);
    $("input[name=azjatycka][value='azjatycka']").prop("checked",false);
    $("input[name=wegetarianska][value='wegetarianska']").prop("checked",false);
    $("input[name=fast-food][value='fast-food']").prop("checked",false);
    $("input[name=kebab][value='kebab']").prop("checked",false);
    $("input[name=polska][value='polska']").prop("checked",false);
    localStorage.setItem('Type', this.value);
    selected = [];
  }

    });
  }

}
