/*	
	----------------------------------
	Local storage WebSQL implementation
	----------------------------------
*/

function LocalStorageWebSQL(){
	var self = this;
	console.log("Opening...");
	this.db = openDatabase('test3', '1.0', 'test2', 2 * 1024 * 1024);	

	this.onupgradeneeded = function(e) {
		console.log("Upgrading...");

		self.db.transaction(function (tx) {  
		   	tx.executeSql('CREATE TABLE IF NOT EXISTS cars (id AUTO_INCREMENT, obj)', [] ,function(e){
				console.log("success query");
			},function(e){
				console.log("error query");
			}
			);
		},function(e){
			console.log("error creating cars");
		},function(e){
			console.log("success creating cars");
		});

		self.db.transaction(function (tx) {  
		   	tx.executeSql('CREATE TABLE IF NOT EXISTS players (id AUTO_INCREMENT, obj)');
		},function(e){
			console.log("error creating players");
		},function(e){
			console.log("success creating players");
		});
	}

	self.onupgradeneeded();

	this.set = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table
		delete dataObj.table;

		self.db.transaction(function (tx) {  
			if(dataObj.id!=0){
				tx.executeSql("UPDATE "+storeName+" set obj='"+JSON.stringify(dataObj)+"' WHERE id='"+dataObj.id+"'");
			}else{
				tx.executeSql("INSERT INTO "+storeName+" (id, obj) VALUES ("+dataObj.id+",'"+JSON.stringify(dataObj)+"')");
			}
		},function(e){
			console.log("kocallback");
			if (typeof kocallback !== "undefined") {
				kocallback();
			}
		},function(e){
			console.log("okcallback");
			if (typeof okcallback !== "undefined") {				
				okcallback();
			}
		});
	}

	this.get = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		var id = dataObj.id;
		var resDataObj = {};

		self.db.transaction(function (tx) {  
			tx.executeSql(
				"SELECT * FROM cars WHERE id='"+id+"'", [], 
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
				kocallback();
			}
		},function(e){
			console.log("okcallback");
			console.log(resDataObj);
			if (typeof okcallback !== "undefined") {				
				okcallback(resDataObj);
			}
		});
		
	}

	this.getAll = function(dataObj, okcallback, kocallback){
		var storeName = dataObj.table;
		var resDataObjs = [];

		self.db.transaction(function (tx) {  
			tx.executeSql(
				"SELECT * FROM cars", [], 
				function(tx, rs){
					console.log('select ok');
					console.log('rows:' + rs.rows.length);
					for(i=0;i<rs.rows.length;i++) {
						var row = rs.rows.item(i);
						console.log(row);
						var rowDataObj = JSON.parse(row['obj']);
						rowDataObj.id = row['id']; 
						resDataObjs.push(rowDataObj);												
					}
      				},function(tx, e){
					console.log(tx);
					console.log(e);
				}
			);
		},function(e){
			console.log("kocallback");
			if (typeof kocallback !== "undefined") {
				kocallback();
			}
		},function(e){
			console.log("okcallback");
			console.log(resDataObj);
			if (typeof okcallback !== "undefined") {
				for(i=0;i<resDataObjs.length;i++){
					var resDataObj = resDataObjs[i];				
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
				"DELETE FROM cars WHERE id='"+id+"'");
		},function(e){
			console.log("kocallback");
			if (typeof kocallback !== "undefined") {
				kocallback();
			}
		},function(e){
			if (typeof okcallback !== "undefined") {				
				okcallback();
			}
		});		
	}
}
