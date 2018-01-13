$(window).on('load', function() {


  setTimeout(function(){
    $('.loadingLogo').fadeOut("normal");
    $('body').removeClass("scrollDisabled");
  }, 500);

  // autoload images lazy HTML
  var landscape = {
    "total": 5,
    "target_dir": "assets/photos/landscape/",
  };
  var portrait = {
    "total": 25,
    "target_dir": "assets/photos/portrait/",
  };
  for (var i = 1; i <= landscape.total; i++) {
    $('#landscape-slider').append("<img src='"+landscape.target_dir+"image_("+i+").jpg' data-thumb='"+landscape.target_dir+"image_("+i+").jpg' alt=''>");
  };
  for (var i = 1; i <= portrait.total; i++) {
    $('#portrait-slider').append("<img src='"+portrait.target_dir+"image_("+i+").jpg' data-thumb='"+portrait.target_dir+"image_("+i+").jpg' alt=''>");
  }

  //date count
  var firstday = new Date(2016, 3, 26); // April 26, 2016 javascript month : 0-11
  var today = new Date();
  var difference_ms = today - firstday;
  var difference = parseInt(difference_ms/(1000*60*60*24)) + 1; // count from day 0
  $('.date-count').html(difference);

  // if screen size is <= 768px (small screen), show portrait banner img
  var viewWidth = $(window).width();

  if (viewWidth <= 768) {
    $('#main-banner img:first-child').attr("src","assets/photos/banner_small.jpg");
    $('#main-banner img:nth-child(2)').attr("src","assets/photos/portrait/image_(6).jpg");
  }


  // nivo-slider config
  $('#main-banner').nivoSlider({
    effect: 'fade',
    pauseTime: 4000,
    directionNav: false,
    controlNav: false,
    pauseOnHover: false,
  });
  $('#landscape-slider').nivoSlider({
    effect: 'random',
    pauseTime: 0,
    animSpeed: 300,
    manualAdvance: true,
    controlNavThumbs: false,
    afterChange: function() {if(nivoReady){currentLandscape();}},
  });
  $('#portrait-slider').nivoSlider({
    effect: 'random',
    pauseTime: 0,
    animSpeed: 300,
    manualAdvance: true,
    controlNavThumbs: true,
    afterChange: function() {if(nivoReady){currentPortrait();}},
  });


  // swipe event
  $('#landscape-slider').on('swiperight', function() {
    $("#landscape-slider .nivo-directionNav .nivo-prevNav").click();
  });
  $('#landscape-slider').on('swipeleft', function() {
    $("#landscape-slider .nivo-directionNav .nivo-nextNav").click();
  });
  $('#portrait-slider').on('swiperight', function() {
    $("#portrait-slider .nivo-directionNav .nivo-prevNav").click();
  });
  $('#portrait-slider').on('swipeleft', function() {
    $("#portrait-slider .nivo-directionNav .nivo-nextNav").click();
  });

  //thumbnail highlight

  var nivoReady = false;
  function currentLandscape() {
    var currentLS = $('#landscape-slider').data('nivo:vars').currentSlide + 1;
    $('#landscape-slider-wrapper .nivo-controlNav.nivo-thumbs-enabled img').removeClass("current");
    $('#landscape-slider-wrapper .nivo-controlNav.nivo-thumbs-enabled a:nth-child('+currentLS+') img').addClass("current");
    nivoReady = true;
  };
  function currentPortrait() {
    var currentPS = $('#portrait-slider').data('nivo:vars').currentSlide + 1;
    $('#portrait-slider-wrapper .nivo-controlNav.nivo-thumbs-enabled img').removeClass("current");
    $('#portrait-slider-wrapper .nivo-controlNav.nivo-thumbs-enabled a:nth-child('+currentPS+') img').addClass("current");
    nivoReady = true;
  };
  currentLandscape();
  currentPortrait();

  $('#portrait-slider-wrapper .nivo-controlNav.nivo-thumbs-enabled img').on('click', function() {
    $('html,body').animate({
      scrollTop: $('#portrait-section').offset().top,
    }, 500);
  })


});
