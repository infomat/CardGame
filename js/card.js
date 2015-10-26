//Read all card images into array
//Make random 5 number between 0~39


//Display back card
//If User select card1, display card1 at the array
//If User select card2, display card2 at the array
//If Card1 and Card2 does not match, display back, and back at the deck
//If match, show card face with card1,card2's index and increase match count
//Show Back at the deck
//If all card match( match count = # of card /2), show timer and success message and ask play again
$(document).ready(function() {
    var $listNode = $("#image_list");
    var $captionNode = $("#caption");
    var $deckImageNode = $(".deckimage");
    var $backImage = new Image();
    var thumbImages = $listNode.find('img');
    var links = $listNode.find('a');

    var imageCache = [];
    var linkHrefPrefix = 'images/c';
    var imageTitlePrefix = 'card'
    var totalImage = 40;
    var numDeck = 5;
    var cardNumber = [];
    var randNum, matchCount;
    var i, image, curSelCard, prevSelCard;
    
    $backImage.src = $deckImageNode[0].getAttribute("src");
    $backImage.title = $deckImageNode[0].getAttribute("alt");
    
    //Read all images
    for(i = 1; i <= totalImage; i++){
        var img = new Image();
        image = new Image();
        image.src = linkHrefPrefix + i + '.png'
        image.title = imageTitlePrefix + i;
        imageCache.push(image);
    }
    loadCard();
    
    //display backcard
    
    //get user selection card index
    for(i = 0; i < links.length; i++){
        linkNode = links[i];
        $(linkNode).on('click', function(e) {
            e.preventDefault();
            curSelCard = $(this).parent().index();
            if ((prevSelCard == null) || (prevSelCard == curSelCard)) {
                showDeckImage(1,cardNumber[curSelCard]);
                prevSelCard = curSelCard;
            } else {
                showDeckImage(2,cardNumber[curSelCard]);
                if (cardNumber[prevSelCard] == cardNumber[curSelCard]){
                    //show thumnail card , remove link, and increase match count
                    showCard(prevSelCard);
                    showCard(curSelCard);
                    matchCount++;
                    
                } else {
                    prevSelCard = null;
                    //show back cover after 500ms
                    setTimeout(function(){showDeckImage(0,0);}, 500);
                }
            }
        });
    }
    
    
    /************************************************************************************/
    function loadCard() {
        matchCount = 0;
        //Make 5 random from 40 and store at array with two
        for (i = 0; i < numDeck; i++){
            do {
                randNum = Math.floor(Math.random() * totalImage);
            } while (checkDuplcate(i-1,randNum))
            cardNumber[i] = randNum;
            cardNumber[i+numDeck] = randNum;
        }
        //shuffle array
        shuffleNum(numDeck*2)
    }
    
    function checkDuplcate(count,randNum )
    {
        for (var j = 0; j < count; j++){
            if (cardNumber[j] == randNum) return true;
        }
        return false;
    }
    
    function shuffleNum(count)
    {
        var tmp;
        for (var j = 0; j < count; j++){
            randNum = Math.floor(Math.random() * count);
            tmp = cardNumber[j];
            cardNumber[j] = cardNumber[randNum];
            cardNumber[randNum] = tmp;
        }
    }
    
    //input index will be user selected index
    //will remove <a> to prevent user selection
    function showCard(index) {
        cardindex = cardNumber[index];
        image = imageCache[cardindex];
        thumbImages[index].setAttribute('src', image.src);
        thumbImages[index].setAttribute('alt', image.title);
    }
    
    //input index will be card's index not user input
    function showDeckImage(index, count) {
        image = imageCache[count];
        if (index == 0) {
           $deckImageNode[0].setAttribute('src', $backImage.src);
           $deckImageNode[0].setAttribute('alt', $backImage.title);
           $deckImageNode[1].setAttribute('src', $backImage.src);
           $deckImageNode[1].setAttribute('alt', $backImage.title);
            
        } else if (index == 1){
            $deckImageNode[0].setAttribute('src', image.src);
            $deckImageNode[0].setAttribute('alt', image.title);
        } else {
            $deckImageNode[1].setAttribute('src', image.src);
            $deckImageNode[1].setAttribute('alt', image.title);
        }
    }
    function pretty_time_string(num) {
     return ( num < 10 ? "0" : "" ) + num;
    }

    var start = new Date;    
    setInterval(function() {
        var seconds = Math.floor((new Date - start) / 1000);   
        seconds = pretty_time_string(seconds);
        var currentTimeString = "Timer: " + seconds + " secs";
        $('.timer').text(currentTimeString);
    ``}, 1000);
/*    
    
  //If user select reset, reload card again.
  for(i = 0; i < $(totalImage); i++){
    linkNode = links[i];
    
    $(linkNode).on('click', function(e) {
      e.preventDefault();
      imageCounter = $(this).parent().index();
      swapImage(imageCounter);
    });

  }

  var imageArray = [];
  for(i = 0; i < links.length; i++){
    linkNode = links[i];
  $("img").each(function(){
  imageArray.push($(this).attr("src"));
  idx++;
  });   
  var idxRAND = Math.floor(imageArray.length * Math.random());
    }
    
    

  function showTimer(count){
      //count timer
  }
  function swapImage(count) {
    image = imageCache[count];

    $imageNode.attr('src', image.src);
    $imageNode.attr('alt', image.title);
    $captionNode.html(image.title);
  }

  $('#reset').on('click', function(e) {
    e.preventDefault();
    if(--imageCounter < 0) {
      imageCounter = imageCache.length - 1;
    }
    swapImage(imageCounter);
  });

  function pretty_time_string(num) {
    return ( num < 10 ? "0" : "" ) + num;
  }

  var start = new Date;    
  setInterval(function() {
    var seconds = Math.floor((new Date - start) / 1000);   
    seconds = pretty_time_string(seconds);
    var currentTimeString = "Timer: " + seconds + " secs";
    $('.timer').text(currentTimeString);
``}, 1000);
    */
});
