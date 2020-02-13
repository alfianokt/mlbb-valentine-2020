/*
 13-02-2019 
 alfianokt
*/

var start = false;

window.setInterval(function() {
	// select container result, 'cResult'
	var cResult = document.getElementById('cResult');
	cResult.scrollTop = cResult.scrollHeight;

		if (start) {
			bom()
		}
}, 1000);


async function bom() {
	var targetId = document.getElementById('input-id').value;
	var targetServer = document.getElementById('input-server').value

	// create random number between 0000000-9999999
	var id = Math.floor(Math.random()*9999999);
	// create random number between 0000-9999
	var server = Math.floor(Math.random()*9999);

	// create form data
	var form = new FormData();

	// appending form data
	form.append('user_id', id);
	form.append('group_id', server);
	form.append('support_type', 'Valentine');
	form.append('cdk', '');
	form.append('type', 'client');

	// request to get token :')
	var request = await fetch('https://eventapi.mobilelegends.com/comm_activity_api/Login', {
		method: 'POST',
		body: form
	});
	var json = await request.json();

	// console.log('json', json);

	// create form data (2) 
	var form2 = new FormData();

	// appending form data (2)
	form2.append('token', json.tocken);
	form2.append('user_id', id);
	form2.append('group_id', server);
	form2.append('support_type', 'Valentine');
	form2.append('get_user_id', targetId);
	form2.append('get_group_id', targetServer);
	form2.append('share_type', 1);

	// request to send reward
	var request2 = await fetch('https://eventapi.mobilelegends.com/comm_activity_api/giveGiftByUsers', {
		method: 'POST',
		body: form2
	});

	var json2 = await request2.json();

	var result = document.getElementById('result');
	result.innerHTML +=  `<div class="col-12 mt-1">
										    	<span class="label label-rounded label-${json2.code == 200 ? 'success' : 'error'}">${id + ':' + server} | ${json2.code == 200 ? 'Sukses' : 'Gagal, ' + json2.message}</span>
									    	</div>`;
}

function startStop() {
	start = !start
	document.getElementById('startStop').innerHTML = start ? 'Stop' : 'Start'
}