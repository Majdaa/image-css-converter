$(document).ready(function() {});

const loadFile = function(event) {
  const image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};
