function DataObject(table, ls){
	this.ls = ls;
	this.table = table;
	var self = this;

	this.set = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.set(dataObj, okcallback, kocallback);
	}

	this.get = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.get(dataObj, okcallback, kocallback);
	}

	this.getAll = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.getAll(dataObj, okcallback, kocallback);
	}

	this.remove = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.remove(dataObj, okcallback, kocallback);
	}

	this.empty = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.empty(dataObj, okcallback, kocallback);
	}
}
