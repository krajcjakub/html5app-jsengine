function Screen(){
	var self = this;
	this.screens = [];

	this.addObject = function(sName, sId){
		var scrn = new ScreenObject(sId, self.screens); 
		this[sName] = scrn;
		self.screens.push(scrn);
	}
}