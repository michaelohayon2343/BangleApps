var boolean = false;
var number = 10;
var counter;
var counterInterval;

function outOfTime() {
  if (counterInterval) return;
  E.showMenu(endmenu);
}

function countDown() {
  counter--;
  // Out of time
  if (counter<0) {
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
  counter = number;
  countDown();
  if (!counterInterval)
    counterInterval = setInterval(countDown, 1000);
}


//endmenu
var endmenu = {
  "": {
    "title": " Timer Ended"
  },
  "Reset": function() {
    startTimer();
  },
  "Back": function() {
    E.showMenu(mainmenu);
  },
};


var mainmenu = {
  "": {
    "title": " Main Menu"
  },
  "Start Timer": function() {
    startTimer();
  },
  "Countdown to": {
    value: number,
    min: 0,
    max: 100,
    step: 10,
    onchange: v => {
      number = v;
    }
  },
  "Exit": function() {
  Bangle.loadWidgets();
  draw();
  setTimeout(Bangle.drawWidgets,0);
  }
};

E.showMenu(mainmenu);
