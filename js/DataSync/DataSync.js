/*	
	----------------------------------
	Data synchronization object
	---------------------------------- 
*/

function DataSyncObj(){
	this.localChanges = new Array();
	this.sl = new SyncLogger();
	this.conected = false;
	this.syncing = false;

	var self = this;

	this.waitForConnection = function(callback){
		if(self.conected==true){
			callback();
		}else{
			setTimeout(function(){self.waitForConnection(callback);},1000);
		}
	}

	this.addLocalChange = function(dataObj){
		if(self.syncing==false){
			self.localChanges.push(dataObj);
			self.syncToRemote();
		}else{
			self.localChanges.push(dataObj);
		}
	}

	this.pushToRemote = function(dataObj,callback){
		//TODO: realne ajaxové odoslanie na server
		setTimeout(callback,1000);
	}

	this.pullFromRemote = function(){
		//TODO: realne ajaxové stiahnutie so serveru
		var data = [
			{'table':'cars', 'id':1, 'name':'Ferari'},
			{'table':'cars', 'id':2, 'name':'Audi'},
			{'table':'cars', 'id':3, 'name':'traktor'},
			{'table':'cars', 'id':4, 'name':'Seat'},
			{'table':'cars', 'id':5, 'name':'Citroen'},
			{'table':'cars', 'id':1, 'name':'Audi'},
			{'table':'cars', 'id':4, 'name':'traktor'},
			{'table':'cars', 'id':3, 'name':'Seat'},
			{'table':'cars', 'id':2, 'name':'Citroen'}
		]; 
		setTimeout(function(){self.syncToLocal(data);},1000);
	}

	this.syncToRemote = function(){
		//setSync to true
		self.syncing = true; 

		//wait for connection
		if(self.conected==false){
				self.waitForConnection(function(){self.syncToRemote();});
				return false;
		}else{
			if(self.localChanges.length>0){
				self.sl.info('Syncing to Remote. Pending '+self.localChanges.length +' operations');
				rowObj = self.localChanges.shift();
				self.pushToRemote(rowObj,function(){
					self.syncToRemote();
				});
			
			}else{
				self.sl.info('Nothing to sync');
				self.syncing = false;
			}
			return true;
		}				
	}

	this.syncToLocal = function(data){
		//console.log(data);
		for(i=0;i<data.length;i++){
			window.LStorage.setQuietly(data[i]);
		}
	}
}
