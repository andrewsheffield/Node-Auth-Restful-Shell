function makeNewPoint(id) {

	$.ajax({
		type: "POST",
	 	url: "/documents/points/" + id,
		data: { title: "add a point test", note: "This and that and the other"},
		dataType: "json",
		success: function(point) {
			console.log(point);
		}

	});

}

function getDocuments() {

	$.ajax({
		method: 'GET',
	 	url: "/documents",
		dataType: "json",
		success: function(data) {
			console.log(data);
		}

	});

}