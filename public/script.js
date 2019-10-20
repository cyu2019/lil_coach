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
	time = Number.parseFloat(document.getElementById("time").value) * 1000 * 60;
	n = Number.parseInt(document.getElementById("n").value);
	document.getElementById("time").disabled = true;
	document.getElementById("n").disabled = true;
	document.getElementById("start").disabled = true;
	var grrr = () => {
		if (n > 0) {
			new Notification(nextMessage.kaomoji, {
				'body': nextMessage.message + "\n(" + (document.getElementById("time").value*n) + " minutes remaining)"
			});
			loadNextMessage();
			n --;
			setTimeout(grrr,time);
		} else {
			document.getElementById("time").disabled = false;
			document.getElementById("n").disabled = false;
			document.getElementById("start").disabled = false;
			new Notification("( ´ ▽ ` )ﾉ", {'body': "That was a good session! See you next time!"})
		}
		
	}
	setTimeout(grrr,time);
});