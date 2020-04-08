
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
 
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('input-field');
    var instances = M.FormSelect.init(elems, options);
  });
  
  $(document).ready(function(){
    $('select').formSelect();
  });