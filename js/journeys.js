$(document).ready(function() {
  $('.album').hide();
  $('#alb1, #moreToCome, #alb10').show();

  $('.nxt').click(function() {

    if ( $(this).parent().attr('id') === 'alb8') {
      $('#moreToCome').hide();
    }

    $(this).parent().next('.album').show('slow');
    $(this).hide();

  });

});
