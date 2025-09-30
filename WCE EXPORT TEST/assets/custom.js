
jQuery(function($){ 

    // Review Slider Influencers
    new Splide( '#review-slider', {
      type        : 'loop',
      autoplay    : true,
      interval    : 3000,
      pagination  : true,
      arrows      : false,
      perPage     : 3,
      gap         : '50px',
      breakpoints : {
           '1025': {
            perPage: 2,
            gap    : '30px',
           },
           '768': {
            perPage: 1,
           },
      }   
    } ).mount();

  
  // Video Pop up on Click
  $("body").on("click", ".inf-trigger", function (e) {
      e.preventDefault();
      let $tabs = $(this).parent(),
          x = 0;
      while (!$tabs.find(".inf-video-popup").length && x < 10) {
          $tabs = $tabs.parent();
          x++;
      }
  
      $tabs.find(".inf-video-popup.active,.inf-trigger.active,.inf-video-overlay.active,.popup-cross.active").removeClass("active");
      let a = $(this).attr("data-tab");
      $(this).addClass("active"), $tabs.find(".inf-video-popup." + a).addClass("active");
      $('.inf-video-overlay, .popup-cross').addClass("active");
  
  });


    $('.inf{{ forloop.index0 }}').on('pumBeforeClose', function () {
        var $iframe = $('iframe', $(this)),
        src = $iframe.prop('src');
        $iframe.prop('src', '').prop('src', src.replace('?autoplay=1', ''));
    });

  //Close video pop up
  $(".inf-video-overlay, .popup-cross").on("click", function(){
    var $vidsrc =  $('.inf-video-popup.active .videoWrapper').children('iframe').attr('src');    
       
    $('.inf-video-popup.active .videoWrapper').children('iframe').attr('src', '');
    $('.inf-video-popup.active .videoWrapper').children('iframe').attr('src', $vidsrc);

    // var $tiksrc =  $('.inf-video-popup.active .tiktok-embed').children('iframe').attr('src');    
    // $('.inf-video-popup.active .tiktok-embed').children('iframe').attr('src', '');    
    // $('.inf-video-popup.active .tiktok-embed').children('iframe').attr('src', $tiksrc);
    
    $(".inf-video-popup.active,.inf-trigger.active,.inf-video-overlay.active,.popup-cross.active").removeClass("active");
    
    console.log("Youtube " + $vidsrc);
    console.log("TIktok " + $tiksrc);
  });

});