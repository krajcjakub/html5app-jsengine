function ScreenObject(sId, screens){
	this.sId = sId;
	this.screens = screens;
	var self = this;

	this.open = function(){
		for(i=0;i<screens.length;i++){
			document.getElementById(screens[i].sId).style.display = "none";
		}

		document.getElementById(self.sId).style.display = "block";
	}

	this.close = function(){
		document.getElementById(self.sId).style.display = "none";
	}
}
