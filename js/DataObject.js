function DataObject(table, ls){
	this.ls = ls;
	this.table = table;
	var self = this;

	this.Add = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.add(dataObj, okcallback, kocallback);
	}

	this.Set = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.set(dataObj, okcallback, kocallback);
	}

	this.Get = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.get(dataObj, okcallback, kocallback);
	}

	this.GetAll = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.getAll(dataObj, okcallback, kocallback);
	}

	this.Del = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.remove(dataObj, okcallback, kocallback);
	}

	this.Clr = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.empty(dataObj, okcallback, kocallback);
	}
}
