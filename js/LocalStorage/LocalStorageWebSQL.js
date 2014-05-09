/*	
	----------------------------------
	Local storage WebSQL implementation
	----------------------------------
*/

function LocalStorageWebSQL(models){
	var self = this;
	this.models = models;
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
			for(i=0;i<self.models.length;i++){
				var tableName = self.models[i].table;
				console.log(tableName);
			   	tx.executeSql('CREATE TABLE IF NOT EXISTS '+tableName+' (id INTEGER PRIMARY KEY, obj)', [] ,function(e){
					console.log("success "+tableName+" query");
				},function(e){
					console.log("error "+tableName+" query");
				});
			}
		},function(e){
			console.log("error creating transaction");
		},function(e){
			console.log("success creating transaction");
		});

	}

	this.add = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table
		delete dataObj.table;

		self.db.transaction(function (tx) {  
			if(dataObj.id!=0){
				tx.executeSql("INSERT INTO "+storeName+" (id, obj) VALUES ("+dataObj.id+",'"+JSON.stringify(dataObj)+"')");
			}else{
				tx.executeSql("INSERT INTO "+storeName+" (id, obj) VALUES (NULL,'"+JSON.stringify(dataObj)+"')");
			}
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
					//TODO: ak je toto asynchrónne, tak sa stihne resDataObj zmeniť na posledný skôr ako sa začne vykonávať
					//prvý callback - teda vypíše N x poslený záznam			
					okcallback(resDataObj);
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
