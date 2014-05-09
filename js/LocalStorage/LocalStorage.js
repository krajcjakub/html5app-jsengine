/*	
	----------------------------------
	Local storage abstract object
	----------------------------------

	Storage technology Independent 
*/

function LocalStorage(DSO){
	//this.dso = DSO; //Data Sync Object

	var self = this;

	this.init = function(database, version){
		this.ls = new LocalStorageIndexedDB();

		if(this.ls.check()){
			this.ls.init(database, version);
			return true;
		}else{
			this.ls = new LocalStorageWebSQL();
			if(this.ls.check()){
				this.ls.init(database, version);
				return true;
			}else{
				alert("No local storage supported");
				return false;
			}	
		}
	}
	

	this.set = function(dataObj, okcallback, kocallback){
		//self.dso.addLocalChange(dataObj);
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
