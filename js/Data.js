function Data(){
	//objects	
	this.AJAX;
	this.DataSync;	

	//properties
	this.hasLS = false;
	this.hasConnection = false;

	//constructor
	this.LStorage = new LocalStorage();
	this.hasLS = this.LStorage.init('testDb',1);

	var self = this;

	this.addObject = function(oName,table){
		this[oName] = new DataObject(table,self.LStorage); 
	}
}
