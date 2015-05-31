function makeNewPoints() {

	for (i = 0; i < 10; i++) {
		$.ajax({
			type: "POST",
		 	url: "/points",
			data: { title: "Point: #" + i, note: "This and that and the other"},
			dataType: "json",
			success: function(point) {
				console.log("point added");
			}
		});

	}
}

function deleteAPoint(id) {

	$.ajax({
			type: "DELETE",
		 	url: "/points/" + id,
			success: function(point) {
				console.log("point deleted");
			}
		});

}