/*	
	----------------------------------
	Local storage abstract object
	----------------------------------

	Storage technology Independent 
*/

function LocalStorage(DSO){
	this.dso = DSO; //Data Sync Object

	//this.ls = new LocalStorageWebSQL();
	this.ls = new LocalStorageIndexedDb();

	var self = this;

	this.set = function(dataObj, okcallback, kocallback){
		self.dso.addLocalChange(dataObj);
		self.setQuietly(dataObj, okcallback, kocallback);
	}

	this.setQuietly = function(dataObj, okcallback, kocallback){
		self.ls.set(dataObj, okcallback, kocallback);
	}

	this.get = function(dataObj, okcallback, kocallback){
		self.ls.get(dataObj, okcallback, kocallback);
	}

	this.getAll = function(dataObj, okcallback, kocallback){
		self.ls.getAll(dataObj, okcallback, kocallback);
	}

	this.remove = function(dataObj, okcallback, kocallback){
		self.ls.remove(dataObj, okcallback, kocallback);
	}

	this.empty = function(dataObj, okcallback, kocallback){
		self.ls.empty(dataObj, okcallback, kocallback);
	}
}
