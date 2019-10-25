if (!("Notification" in window)) {
	alert("This browser does not support system notifications");
	// This is not how you would really do things if they aren't supported. :)
}
Notification.requestPermission()
var n = 0;
var time = 0;

var nextMessage = {};

async function loadNextMessage() {
	var r = await fetch("/randomNotif");
	nextMessage = await r.json();
}

loadNextMessage();

document.getElementById("start").addEventListener('click',(e)=> {
	if (Notification.permission != "granted") {
		alert("Please enable notifications first!");
		Notification.requestPermission()
		return;
	}
	new Notification("( ´ ▽ ` )ﾉ", {'body': "Ok, let's get started!"})
	console.log("a");
	time = Number.parseFloat(document.getElementById("time").value) * 1000 * 60;
	n = Number.parseInt(document.getElementById("n").value);
	document.getElementById("time").disabled = true;
	document.getElementById("n").disabled = true;
	document.getElementById("start").disabled = true;
	document.getElementById("start-form").style.display = "none";
	
	document.getElementById("description").innerHTML = "Set for <strong>"+n+"</strong> incremements of <strong>"+document.getElementById('time').value+"</strong> minutes. Good luck!"
	
	var date = new Date(new Date().getTime() + time * n);
	startTimer(date);
	
	
	var grrr = () => {
		
		if (n > 1) {
			new Notification(nextMessage.kaomoji, {
				'body': nextMessage.message + "\n(" + (document.getElementById("time").value*n) + " minutes remaining)"
			});
			n --;
			loadNextMessage();
			
			setTimeout(grrr,time);
		} else {
			document.getElementById("time").disabled = false;
			document.getElementById("n").disabled = false;
			document.getElementById("start").disabled = false;
			document.getElementById("start-form").style.display = "flex";
			new Notification("( ´ ▽ ` )ﾉ", {'body': "That was a good session! See you next time!"})
		}
		
	}
	setTimeout(grrr,time);
});


var countDownDate = 0;

function startTimer(date) {
	// Update the count down every 1 second
	countDownDate = date;
	document.getElementById("timer").style.display = 'block';
	var incTimer = function() {

	  // Get today's date and time
	  var now = new Date().getTime();

	  // Find the distance between now and the count down date
	  var distance = countDownDate - now;

	  // Time calculations for days, hours, minutes and seconds
	  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	  // Display the result in the element with id="demo"
	  var countdown = document.getElementById("countdown");
	  countdown.innerHTML = "";
	  if (days > 0) {
		countdown.innerHTML += days + "d ";
	  }
	  if (hours > 0) {
		countdown.innerHTML += hours + "h ";
	  }
	  if (minutes > 0) {
		countdown.innerHTML += minutes + "m ";
	  }
	  countdown.innerHTML += seconds + "s "
	  
	  // If the count down is finished, write some text
	  if (distance < 0) {
		clearInterval(x);
		document.getElementById("timer").style.display = 'none';
	  }
	}
	incTimer();
	var x = setInterval(incTimer, 1000);
}