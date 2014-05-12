function Data(db){
	//objects	
	this.AJAX;
		

	//properties
	this.hasLS = false;
	this.hasConnection = false;

	//constructor
	this.LStorage = new LocalStorage();
	this.hasLS = this.LStorage.init(db);
	this.DSync = new DataSync();

	var self = this;

	this.addObject = function(oName,table){
		this[oName] = new DataObject(table, self.LStorage, self.DSync); 
	}
}
