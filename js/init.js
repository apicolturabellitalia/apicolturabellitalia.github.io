//initialize sidenav
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
});

//initialize parallax
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, {});
  });

//initialize collapsible
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
  });

//initialize modal
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  });

//show div id cookiepolicy
document.addEventListener("DOMContentLoaded", function () {
     const elem = document.getElementById('cookiepolicy');
     const instance = M.Modal.init(elem, {dismissible: false});
     instance.open();
  });