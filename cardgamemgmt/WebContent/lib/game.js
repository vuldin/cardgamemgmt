var foo;
var dc;
var front;
var back;
var timer;
var hoverok;
var cardWidth, cardHeight;
require([
  "dojo/dom-construct",
  "dojo/dom-class",
  //"dojox/timing",
  "dojo/dnd/Moveable",
  "dojo/query"
  //"dojo/domReady!"
  ], function(domConstruct,domClass){
/*
  timer = new dojox.timing.Timer(2000);
  timer.start();
  timer.onTick = function(){
    console.log("hover ready");
    hoverok = true;
  }
*/
  function createCard(id,image){
	getCardSize();
    var card = domConstruct.create("div",{
      id:id,
      style:"height:"+cardHeight+"px;width:"+cardWidth+"px;"
    });
    domClass.add(card,"card");
    var front = domConstruct.create("div",{
      style:"height:"+cardHeight+"px;width:"+cardWidth+"px;background-image:url('"+image+"');background-position:center center;background-repeat:no-repeat;background-size:100%;"
    });
    domClass.add(front,"front");
    domConstruct.place(front,card);
    var back = domConstruct.create("div",{
      style:"height:"+cardHeight+"px;width:"+cardWidth+"px;background-image:url('"+location.href+"images/back.jpg');background-position:center center;background-repeat:no-repeat;background-size:100%;"
    });
    domClass.add(back,"back behind");
    domConstruct.place(back,card);
    return card;
  }
  for(var i=0;i<7;i++){
    var rnum = Math.floor((Math.random()*120)+1);
    if(rnum.toString().length == 1) rnum = "00"+rnum;
    if(rnum.toString().length == 2) rnum = "0"+rnum;
    domConstruct.place(createCard("card"+rnum,location.href+"images/A Clash of Arms/"+rnum+".jpg"),"area");
  }
  dc = domClass;
  dojo.query(".card").forEach(function(node,index,arr){
    foo = node;
    //var mnode = dojo.dnd.Moveable(node);
    dojo.connect(node,"onmouseover",function(evt){
      // TODO wait until mousemove event has not been triggered for 2 seconds
      //if(hoverok)domClass.add(dojo.query(".front",dojo.byId(node.id))[0],"hover");
/*
      var nodeFront = dojo.query(".front",dojo.byId(node.id))[0];
      console.log("onmouseover: "+ (nodeFront.className.indexOf("behind") == -1));
      console.log("onmouseover: "+hoverok);
      if(nodeFront.className.indexOf("behind") == -1)domClass.add(nodeFront,"hover");
*/
    });
    dojo.connect(node,"onmouseout",function(){
/*
      domClass.remove(dojo.query(".front",dojo.byId(node.id))[0],"hover");
      hoverok = false;
      timer.start();
*/
    });
    dojo.connect(node,"ondblclick",function(){
      front = dojo.query(".front",dojo.byId(node.id))[0];
      back = dojo.query(".back",dojo.byId(node.id))[0];
      if( node.firstElementChild.className.indexOf("behind") == -1 ) {
        domClass.toggle(front,"toback");
        domClass.toggle(back,"tofront");
      } else {
    	domClass.toggle(front,"tofront");
        domClass.toggle(back,"toback");
      }
      window.setTimeout("dc.toggle(front,'behind');dc.toggle(back,'behind');dc.remove(front,'tofront toback');dc.remove(back,'tofront toback');", 1000);
    }); // end ondblclick
    window.onresize = function(){
      getCardSize();
      dojo.query(".card").forEach(function(node,index,arr){
        node.style.width = cardWidth+"px";
        node.style.height = cardHeight+"px";
      });
      dojo.query(".front").forEach(function(node,index,arr){
          node.style.width = cardWidth+"px";
          node.style.height = cardHeight+"px";
        });
      dojo.query(".back").forEach(function(node,index,arr){
          node.style.width = cardWidth+"px";
          node.style.height = cardHeight+"px";
        });
    };
/*
    dojo.connect(mnode, "onMoving", function(){
      domClass.remove(dojo.query(".front",dojo.byId(node.id))[0],"hover");
    }); // end onMoving
    dojo.connect(dojo.byId("area"), "onmousemove", function(){
      //console.log("timer stopped");
      timer.stop();
      hoverok = false;
    }); // end onMoving
    dojo.connect(mnode, "onMoveStop", function(){
      console.log("onMoveStop: timer started");
      timer.start();
    }); // end onMoveStop
*/
  }); // end query for each card
});