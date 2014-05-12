function AJAX(){
	var self = this;

	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		self.xttp = new XMLHttpRequest();
	}else{// code for IE6, IE5
		self.xttp = new ActiveXObject("Microsoft.XMLHTTP");
	}


	this.get = function(url, data, callback_ok, callback_ko){

		if(data!==undefined){
			url = url + '?' + data;
		}

		self.xttp.open("GET", url, true);
		self.xttp.send();

		self.xttp.onreadystatechange = function() {
  			if (this.readyState==4){
  				var response = {
  					"data": this.responseText,
  					"status": this.status,
  				}
  				if(this.status==200){
    				callback_ok(response);
    			}else{
    				callback_ko(response);
    			}
  			}  
  		}
	}

	this.post = function(url, data, callback_ok, callback_ko){

		if(data===undefined){
			data = '';
		}

		self.xttp.open("GET", url, true);
		self.xttp.send(data);

		self.xttp.onreadystatechange = function() {
  			if (this.readyState==4){
  				var response = {
  					"data": this.responseText,
  					"status": this.status,
  				}
  				if(this.status==200){
    				callback_ok(response);
    			}else{
    				callback_ko(response);
    			}
  			}  
  		}
	}

}