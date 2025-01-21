(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    //initialize collapsible
    $('.collapsible').collapsible();
    //initialize all modals           
    $('.modal').modal({dismissible: false});
    //now you can open modal from code
    $('#modal1').modal('open');
    //or by click on trigger
    $('.trigger-modal').modal();
    
  }); // end of document ready
})(jQuery); // end of jQuery name space
