'use strict';

function navBar() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

//guest list add on submit
$("#nameListSubmit").on("click", guestClick);

function guestClick() {
  console.log('click submit fired');
}
