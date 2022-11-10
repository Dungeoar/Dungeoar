(function() {
//assorted functions code begin
function DOMelementOverlapCheck(div1, div2) {
  const domRect1 = div1.getBoundingClientRect();
  const domRect2 = div2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

function waitTest() {
  console.log("hi")
}
//assorted functions code end

//assorted variable defenitions code begin
const SwordCollect = document.getElementById("sword")
const Portal = document.getElementById("LevelTransfer");
var SwordCollectCollected = false;
var wait1 = false;
var wait2 = false;
var wait3 = false;
//assorted variable defenitions code end

//player movement code begin
var xAxis = 50;
var yAxis = 10;
const moveSpeed = 10;
const div = document.getElementById('img');
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 37:
      if(!SwordCollectCollected)
      {
        xAxis -= moveSpeed;
        div.style.left = xAxis + 'px';
      }
      if (DOMelementOverlapCheck(SwordCollect, div) === true)
      {
        SwordCollectCollected = true;
        document.getElementById("sword").style.display='none';
        document.getElementById("imgEl").src="char (4) (2).png";
      	console.log("DOM overlap detected");
        function AnimPart1() 
        {
          document.getElementById("imgEl").src="char (6).png";
        }
        setTimeout(AnimPart1, 2000);      
      }
    break;
    case 38:
      if(!SwordCollectCollected)
      {
        yAxis -= moveSpeed;
        div.style.top = yAxis + 'px';
      }
      if (DOMelementOverlapCheck(SwordCollect, div) === true)
      {
        SwordCollectCollected = true;
        document.getElementById("sword").style.display='none';
        document.getElementById("imgEl").src="char (4) (2).png";
      	console.log("DOM overlap detected");
        function AnimPart1() 
        {
          document.getElementById("imgEl").src="char (6).png";
        }
        setTimeout(AnimPart1, 2000);
      }
    break;
    case 39:
      if(!SwordCollectCollected)
      {      
        xAxis += moveSpeed;
        div.style.left = xAxis + 'px';
      }
      if (DOMelementOverlapCheck(SwordCollect, div) === true)
      {
        SwordCollectCollected = true;
        document.getElementById("sword").style.display='none';
        document.getElementById("imgEl").src="char (4) (2).png";
      	console.log("DOM overlap detected");
        function AnimPart1() 
        {
          document.getElementById("imgEl").src="char (6).png";
        }
        setTimeout(AnimPart1, 2000);
      }
    break;
    case 40:
      if(!SwordCollectCollected)
      {
      yAxis += moveSpeed;
      div.style.top = yAxis + 'px';
      }
      if (DOMelementOverlapCheck(SwordCollect, div) === true)
      {
        SwordCollectCollected = true;
        document.getElementById("sword").style.display='none';
        document.getElementById("imgEl").src="char (4) (2).png";
      	console.log("DOM overlap detected");
        setTimeout(wait1 = true, 100000)
        function AnimPart1() 
        {
          document.getElementById("imgEl").src="char (6).png";
        }
        setTimeout(AnimPart1, 2000);
      }
    break;
  }

};
//player movement code end
})();
