/*	
	----------------------------------
	Local storage IndexedDb implementation
	----------------------------------
*/

function LocalStorageIndexedDB(){	
	this.db = null;
	var self = this;

	this.check = function(){
		window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

		if (!window.indexedDB) {
			return false;
		}else{
			return true;	
		}
	}

	this.init = function(database, version){
		this.openRequest = indexedDB.open(database,version);

		this.openRequest.onupgradeneeded = function(e) {
			var db = e.target.result;

			if(!db.objectStoreNames.contains("cars")) {
				db.createObjectStore("cars", { autoIncrement: true });
			}

			if(!db.objectStoreNames.contains("players")) {
				db.createObjectStore("players", { autoIncrement: true });
			}
		}

		this.openRequest.onsuccess = function(e) {
			console.log("Success!");
			self.db = e.target.result;
		}

		this.openRequest.onerror = function(e) {
			console.log("Error");
			console.dir(e);
		}
	}	

	this.add = function(dataObj, okcallback, kocallback){
		self.set(dataObj, okcallback, kocallback);
	}

	this.set = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table
		delete dataObj.table;

		var transaction = self.db.transaction([storeName],"readwrite");
		var store = transaction.objectStore(storeName);
		if(dataObj.id!=0){
			var request = store.put(dataObj, Number(dataObj.id));
		}else{
			delete dataObj.id;
			console.log(dataObj);
			var request = store.add(dataObj);
		}

		request.onerror = function(e) {
			if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		}

		request.onsuccess = function(e) {
			if (typeof okcallback !== "undefined") {
				setTimeout(function(){okcallback();},0);
			}
		}
		
	}

	this.get = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		var id = dataObj.id;

		var transaction = self.db.transaction([storeName],"readonly");
		var store = transaction.objectStore(storeName);

		var request = store.get(dataObj.id);

		request.onerror = function(e) {
		if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		}

		request.onsuccess = function(e) {
			var result = e.target.result;
			result.id = id;
			if (typeof okcallback !== "undefined") {
				setTimeout(function(){okcallback(result);},0);
			}
		}
		
	}

	this.getAll = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		
		//TODO: filter

		var transaction = self.db.transaction([storeName],"readonly");
		var store = transaction.objectStore(storeName);

		var cursor = store.openCursor();

		cursor.onerror = function(e) {
		if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		}

		cursor.onsuccess = function(e) {
			var res = e.target.result;
			if(res) {
				var result = res.value;
				result.id = res.key;
				if (typeof okcallback !== "undefined") {
					setTimeout(function(){okcallback(result);},0);
				}
				res.continue();
			}
		}
		
	}

	this.remove = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		var id = dataObj.id;

		var transaction = self.db.transaction([storeName],"readwrite");
		var store = transaction.objectStore(storeName);

		var request = store.delete(dataObj.id);

		request.onerror = function(e) {
			if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		}

		request.onsuccess = function(e) {
			/*var result = e.target.result;
			result.id = id;*/
			if (typeof okcallback !== "undefined") {
				setTimeout(function(){okcallback();},0);
			}
		}
		
	}

	this.empty = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;

		var transaction = self.db.transaction([storeName],"readwrite");
		var store = transaction.objectStore(storeName);

		var request = store.clear();

		request.onerror = function(e) {
			if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		}

		request.onsuccess = function(e) {
			if (typeof okcallback !== "undefined") {
				setTimeout(function(){okcallback();},0);
			}
		}
		
	}
}
