/*	
	----------------------------------
	Local storage IndexedDb implementation
	----------------------------------
*/

function LocalStorageIndexedDb(){
	this.openRequest = indexedDB.open("test2",1);
	this.db = null;

	var self = this;

	this.openRequest.onupgradeneeded = function(e) {
		console.log("Upgrading...");
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
				kocallback();
			}
		}

		request.onsuccess = function(e) {
			if (typeof okcallback !== "undefined") {
				console.log("okcallback");
				okcallback();
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
				kocallback();
			}
		}

		request.onsuccess = function(e) {
			var result = e.target.result;
			result.id = id;
			if (typeof okcallback !== "undefined") {
				okcallback(result);
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
				kocallback();
			}
		}

		cursor.onsuccess = function(e) {
			var res = e.target.result;
			if(res) {
				var result = res.value;
				result.id = res.key;
				if (typeof okcallback !== "undefined") {
					okcallback(result);
				}
				res.continue();
			}
		}
		
	}

	this.remove = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		var id = dataObj.id;

		var transaction = self.db.transaction([storeName],"readonly");
		var store = transaction.objectStore(storeName);

		var request = store.delete(dataObj.id);

		request.onerror = function(e) {
			if (typeof kocallback !== "undefined") {
				kocallback();
			}
		}

		request.onsuccess = function(e) {
			/*var result = e.target.result;
			result.id = id;*/
			if (typeof okcallback !== "undefined") {
				okcallback(result);
			}
		}
		
	}
}
