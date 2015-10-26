$(document).ready(function() {
  var $listNode = $("#image_list");
  var $captionNode = $("#caption");
  var $imageNode = $("#image");
  var links = $listNode.find('a');

  var i, linkNode, image;
  var imageCache = [];
  var imageCounter = 0;

  for(i = 0; i < links.length; i++){
    linkNode = links[i];

    $(linkNode).on('click', function(e) {
      e.preventDefault();
      imageCounter = $(this).parent().index();
      swapImage(imageCounter);
    });

    image = new Image();
    image.src = $(linkNode).attr('href');
    image.title = $(linkNode).attr('title');
    imageCache.push(image);
  }

  function swapImage(count) {
    image = imageCache[count];

    $imageNode.attr('src', image.src);
    $imageNode.attr('alt', image.title);
    $captionNode.html(image.title);
  }

  $('#prev').on('click', function(e) {
    e.preventDefault();
    if(--imageCounter < 0) {
      imageCounter = imageCache.length - 1;
    }
    swapImage(imageCounter);
  });

  $('#next').on('click', function(e) {
    e.preventDefault();
    imageCounter = (imageCounter + 1) % imageCache.length;
    swapImage(imageCounter);
  })
  var timer = setInterval(function() {
    imageCounter = (imageCounter + 1) % imageCache.length;
    swapImage(imageCounter);
  }, 2000);
});
