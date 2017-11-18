$(document).ready(init);

var minutes;
var seconds;
var breakMinutes;
var sessionMinutes;
var session = true;
var currentTime;
var start = false;
var id;
var counter = 0;
var totalBreakSeconds;
var totalSessionSeconds;
var currentSessionSeconds;
var currentBreakSeconds;

var handlers = [
  function() {
    counter++;
    sessionMinutes = document.getElementById("session-length").innerHTML - 1;
    breakMinutes = document.getElementById("break-length").innerHTML - 1;
    minutes = sessionMinutes
    seconds = 59;
    currentTime = minutes + ":" + seconds;
    document.getElementById("time").innerHTML = currentTime;
    totalSessionSeconds = (sessionMinutes + 1) * 60;
    totalBreakSeconds = (breakMinutes + 1) * 60;
    currentTotalSeconds = totalSessionSeconds - 1;
    $("#fill2").css("height",Math.floor(((session ? (currentTotalSeconds / totalSessionSeconds):(currentTotalSeconds / totalBreakSeconds)) * 269)) + "px");
    id = setInterval(tick, 1000);
  },
  [
    function() {
      id = setInterval(tick, 1000);
    },
    function() {
      clearInterval(id);
    }
  ]
]

$("#start-stop").click(function() {
  if (counter === 0) {
    handlers[0].apply(this);
  } else {
    handlers[1][counter++ % 2].apply(this);
  }
});

$("#reset").click(function() {
  counter = 0;
  clearInterval(id);
  $("#time").empty();
  $("#current-state").html("SESSION");
  $("#fill2").css("height","269px");
  session = true;
})

function tick() {
  if (seconds === 0) {
    minutes--;
    if (minutes === -1) {
      session = !session;
      minutes = session ? sessionMinutes:breakMinutes;
      currentTotalSeconds = session ? totalSessionSeconds:totalBreakSeconds;
      if (session) {
        document.getElementById("current-state").innerHTML = "SESSION";
      } else {
        document.getElementById("current-state").innerHTML = "BREAK";
      }
    }
    seconds = 60;
  }
  seconds--;
  currentTotalSeconds--;
  $("#fill2").css("height",Math.floor(((session ? (currentTotalSeconds / totalSessionSeconds):(currentTotalSeconds / totalBreakSeconds)) * 269)) + "px");
  if (seconds < 10) {
    currentTime = minutes + ":0" + seconds;
  } else {
    currentTime = minutes + ":" + seconds;
  }
  document.getElementById("time").innerHTML = currentTime;
}

function init() {
  document.getElementById("break-length").innerHTML = 5;
  document.getElementById("session-length").innerHTML = 25;
  document.getElementById("current-state").innerHTML = "SESSION";
}

function change(element, increment) {
  if (increment === "increase") {
  document.getElementById(element).innerHTML++;
  } else if (document.getElementById(element).innerHTML > 0) {
  document.getElementById(element).innerHTML--;
  }
}