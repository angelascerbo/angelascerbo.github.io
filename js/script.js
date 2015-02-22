$(function(){
  //mix it up
  $('#Container').mixItUp();  
  var isOpen = false;
  var dayNum = $('#day-category li a').data('day');
  //logo click, active show all
  $('#logo').click(function(){
    $('#Container').mixItUp('filter', 'all');
  });

  //make nav buttons active
  $('.button').click(function(){
    $(this).addClass('active');
  });

  //hamburger menu click
  $('#hamburger-menu').click(function(){
    if(isOpen === false){
      $('#sort').slideDown();
      $('#filter').slideDown();
      isOpen = true;
    }else{
      $('#sort').slideUp();
      $('#filter').slideUp();
      isOpen = false;
    }
  });
  
  //click function for star
  $('.fa-plus-square-o, .fa-plus-square').click(function(){
    //when star is clicked, toggle solid or outline star
    $(this).toggleClass('fa-plus-square-o fa-plus-square');

    //show the packing list button if item is stared
    if($(this).hasClass('fa-plus-square')) {
      $('#pack').slideDown();
    }

    //put item in pack list if stared 
    $(this).closest('.mix').toggleClass("pack-item");

    //remove item from pack list when star is unclicked
    if ($(this).hasClass('fa-plus-square-o') && $('#pack .button').hasClass('active')) {
      $(this).closest('.mix').removeClass('day-' + dayNum);
      console.log('will not remove day class');
      $(this).closest('.mix').fadeOut();
    }

    //show modal on star click
    if ($(this).hasClass('fa-plus-square')) {
      $('.modal').modal('show');
      var selectedItem = $(this).closest('.mix').data('myorder');
      assignDay(selectedItem);
    }

    //check if no items have a star, slide up packing list button
    $('.mix').each (function() {
      if ($('.mix').hasClass("pack-item")){
        $('#pack').show();
      }
      else if ($('#sort .button').hasClass('active') ||  $('#filter .button').hasClass('active')){
        $('#pack').slideUp();
        // removeDay(dayNum);

      } else {
        refresh();
      }

    //end of check each mix function
    });


    function assignDay(selectedItem) {

      $('#day-category li a').unbind("click");
      $('#day-category li a').click(function(event) {
          var dayNum = $(this).data('day');
          //find class of mix with data-myorder=selectedItem and assign this mix a class of 'day-' +dayNum
          $('.mix[data-myorder="'+ selectedItem + '"]').addClass('day-' + dayNum);
          $('.modal').modal('hide');
      //end of modal click function
      });

      //close modal without selecting day
      $('#modal-close').click(function(){ 
        $('.modal').modal('hide');
      });

    //end of assignDay  
    }

    // function removeDay (dayNum) {
    //   if (dayNum === 0) {
    //       $('.mix').removeClass('day-' + dayNum);
    //   }
    // }
  if ($(this).hasClass('fa-plus-square-o')) {
    $(this).closest('.mix').removeClass('day-' + dayNum);
    console.log('remove class is working on filter and sort');
  }
  // if ($(this).hasClass('fa-plus-square-o') && $('#pack .button').hasClass('active')) {
  //   $(this).closest('.mix').removeClass('day-' + dayNum);
  //   console.log('remove class?');
  // }

  function refresh () {
    if ($('#pack').css("display","none")) {
      document.location.reload()
    }
  }


  //end of star click function
  });



  



//end of doc load func 
});