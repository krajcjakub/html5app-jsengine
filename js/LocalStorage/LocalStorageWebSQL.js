/*	
	----------------------------------
	Local storage WebSQL implementation
	----------------------------------
*/

function LocalStorageWebSQL(){
	var self = this;
	console.log("Opening...");
	

	this.check = function(){
		if (!window.openDatabase) {
			return false;
		}else{
			return true;	
		}
	}

	this.init = function(database, version){
		self.db = openDatabase(database, version, 'my first database', 2 * 1024 * 1024);
		self.onupgradeneeded();
	}


	this.onupgradeneeded = function(e) {

		self.db.transaction(function (tx) {  
		   	tx.executeSql('CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY, obj)', [] ,function(e){
				console.log("success query");
			},function(e){
				console.log("error query");
			});
		},function(e){
			console.log("error creating cars");
		},function(e){
			console.log("success creating cars");
		});

		self.db.transaction(function (tx) {  
		   	tx.executeSql('CREATE TABLE IF NOT EXISTS players (id INTEGER PRIMARY KEY, obj)');
		},function(e){
			console.log("error creating players");
		},function(e){
			console.log("success creating players");
		});
	}

	

	this.set = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table
		delete dataObj.table;

		self.db.transaction(function (tx) {  
			if(dataObj.id!=0){
				tx.executeSql("UPDATE "+storeName+" set obj='"+JSON.stringify(dataObj)+"' WHERE id='"+dataObj.id+"'");
			}else{
				tx.executeSql("INSERT INTO "+storeName+" (id, obj) VALUES (NULL,'"+JSON.stringify(dataObj)+"')");
			}
		},function(e){
			console.log("kocallback");
			if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		},function(e){
			console.log("okcallback");
			if (typeof okcallback !== "undefined") {				
				setTimeout(function(){okcallback();},0);
			}
		});
	}

	this.get = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		var id = dataObj.id;
		var resDataObj = {};

		self.db.transaction(function (tx) {  
			tx.executeSql(
				"SELECT * FROM "+storeName+" WHERE id='"+id+"'", [], 
				function(tx, rs){
					console.log('select ok');
					console.log('rows:' + rs.rows.length);
					if(rs.rows.length>0) {
						var row = rs.rows.item(0);
						resDataObj = JSON.parse(row['obj']);
						resDataObj.id = row['id']; 						
					}
      				},function(tx, e){
					console.log(tx);
					console.log(e);
				}
			);
		},function(e){
			console.log("kocallback");
			if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		},function(e){
			console.log("okcallback");
			console.log(resDataObj);
			if (typeof okcallback !== "undefined") {				
				setTimeout(function(){okcallback(resDataObj);},0);
			}
		});
		
	}

	this.getAll = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		var resDataObjs = [];

		self.db.transaction(function (tx) {  
			tx.executeSql(
				"SELECT * FROM "+storeName+"", [], 
				function(tx, rs){
					for(i=0;i<rs.rows.length;i++) {
						var row = rs.rows.item(i);
						var rowDataObj = JSON.parse(row['obj']);
						rowDataObj.id = row['id']; 
						resDataObjs.push(rowDataObj);												
					}
      			},function(tx, e){

				}
			);
		},function(e){
			if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		},function(e){
			if (typeof okcallback !== "undefined") {
				for(i=0;i<resDataObjs.length;i++){
					var resDataObj = resDataObjs[i];				
					setTimeout(function(){okcallback(resDataObj);},0);
				}
			}
		});
		
	}

	this.remove = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		var id = dataObj.id;

		self.db.transaction(function (tx) {  
			tx.executeSql(
				"DELETE FROM "+storeName+" WHERE id='"+id+"'");
		},function(e){
			if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		},function(e){
			if (typeof okcallback !== "undefined") {				
				setTimeout(function(){okcallback();},0);
			}
		});		
	}

	this.empty = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;

		self.db.transaction(function (tx) {  
			tx.executeSql(
				"DELETE FROM "+storeName+"");
		},function(e){
			if (typeof kocallback !== "undefined") {
				setTimeout(function(){kocallback();},0);
			}
		},function(e){
			if (typeof okcallback !== "undefined") {				
				setTimeout(function(){okcallback();},0);
			}
		});		
	}
}
