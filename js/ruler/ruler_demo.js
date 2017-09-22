/**
 * Created by maor.frankel on 5/19/15.
 */




	setTimeout(function () {
      var ruler1 = new ruler({
        container: document.querySelector('.image-builder'),// reference to DOM element to apply rulers on
        rulerHeight: 25, // thickness of ruler
        fontFamily: 'arial',// font for points
        fontSize: '9px',
        strokeStyle: 'grey',
        lineWidth: 1,
        enableMouseTracking: true,
        enableToolTip: true
      })

     }, 0)


function setPosX1(val){
  ruler1.api.setPos({x:300, y:100})
}

function setScale1(val){
  rul1.api.setScale(val);
}

function hideRuler1(){
  rul1.api.toggleRulerVisibility(visibleGuides1 = !visibleGuides1);
}

function clearGuides1(){
  rul1.api.clearGuides();
}

function storeGuides1(){
  guides1 = rul1.api.getGuides();
}

function setGuides1(){
  rul1.api.setGuides(guides1);
}

function hideGuides1(){
  rul1.api.toggleGuideVisibility(visible1 = !visible1);
}

function destory1(){
  rul1.api.destroy();
}


function setPosX2(val){
  rul2.api.setPos({x:val});
}

function setPosY2(val){
  rul2.api.setPos({y:val});
}

function setScale2(val){
  rul2.api.setScale(val);
}

function hideRuler2(){
  rul2.api.toggleRulerVisibility(visibleGuides2 = !visibleGuides2);
}

function clearGuides2(){
  rul2.api.clearGuides();
}

function storeGuides2(){
  guides2 = rul2.api.getGuides();
}

function setGuides2(){
  rul2.api.setGuides(guides2);
}

function hideGuides2(){
  rul2.api.toggleGuideVisibility(visible2 = !visible2);
}

function destory2(){
  rul2.api.destroy();
}