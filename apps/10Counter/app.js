var counter;
var counterInterval;

function outOfTime() {
  if (counterInterval) return;
  E.showMessage("Out of Time", "My Timer");
  Bangle.buzz();
  Bangle.beep(200, 4000)
    .then(() => new Promise(resolve => setTimeout(resolve,200)))
    .then(() => Bangle.beep(200, 3000));
}

function countDown() {
  counter--;
  // Out of time
  if (counter<=0) {
    clearInterval(counterInterval);
    counterInterval = undefined;
    outOfTime();
    return;
  }

  g.clear();
  g.setFontAlign(0,0); // center font
  g.setFont("Vector",80); // vector font, 80px  
  // draw the current counter value
  g.drawString(counter,g.getWidth()/2, g.getHeight()/2);
  // optional - this keeps the watch LCD lit up
  Bangle.setLCDPower(1);
}

function startTimer() {
  counter = 10;
  countDown();
  
  setWatch(exit,  BTN1,{repeat:true});
  
  if (!counterInterval)
    counterInterval = setInterval(countDown, 1000);
}

function exit(){
   counter =0
   Bangle.buzz();
   g.clear();
  
}

startTimer();
