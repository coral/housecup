
	cvas = document.getElementById("logovas");
	ctx2 = cvas.getContext('2d');
	var dlx = new Image()
	dlx.onload = function() {
		ctx2.drawImage(dlx,438,143);
	}
	dlx.src = 'img/housecup.png';
