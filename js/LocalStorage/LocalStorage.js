/*	
	----------------------------------
	Local storage abstract object
	----------------------------------

	Storage technology Independent 
*/

function LocalStorage(DSO){
	//this.dso = DSO; //Data Sync Object

	var self = this;

	this.init = function(db){
		this.ls = new LocalStorageIndexedDB(db.Models);

		if(this.ls.check()){
			this.ls.init(db.Name, db.Version);
			return true;
		}else{
			this.ls = new LocalStorageWebSQL(db.Models);
			if(this.ls.check()){
				this.ls.init(db.Name, db.Version);
				return true;
			}else{
				alert("No local storage supported");
				return false;
			}	
		}
	}
	
	this.add = function(dataObj, okcallback, kocallback){
		//self.dso.addLocalChange(dataObj);
		self.ls.add(dataObj, okcallback, kocallback);
	}

	this.set = function(dataObj, okcallback, kocallback){
		//self.dso.addLocalChange(dataObj);
		self.ls.set(dataObj, okcallback, kocallback);
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
