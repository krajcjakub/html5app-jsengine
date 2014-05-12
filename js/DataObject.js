function DataObject(table, ls, ds){
	this.ls = ls;
	this.ds = ds;
	this.table = table;
	var self = this;

	this.Add = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		var dataObj2 = clone(dataObj);
		dataObj2.act = "A";


		self.ls.add(dataObj, okcallback, kocallback);
		self.ds.addLocalChange(dataObj2);
	}

	this.Set = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		var dataObj2 = clone(dataObj);
		dataObj2.act = "M";

		self.ls.set(dataObj, okcallback, kocallback);
		self.ds.addLocalChange(dataObj2);
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
		var dataObj2 = clone(dataObj);
		dataObj2.act = "D";

		self.ls.remove(dataObj, okcallback, kocallback);
		self.ds.addLocalChange(dataObj2);
	}

	this.Clr = function(dataObj, okcallback, kocallback){
		dataObj.table = self.table;
		self.ls.empty(dataObj, okcallback, kocallback);
	}
}
