
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
 
 
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('input-field');
    var instances = M.FormSelect.init(elems, options);
  });

  $(document).ready(function(){
    $('select').formSelect();
  });