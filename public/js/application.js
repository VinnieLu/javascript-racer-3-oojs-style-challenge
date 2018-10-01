var gameResetter = function() {
	$("#player-2-strip td.active").removeClass("active");
	$("#player-2-strip td").first().addClass("active");
	$("#player-1-strip td.active").removeClass("active");
	$("#player-1-strip td").first().addClass("active");
};

var updatePlayerPosition = function(player) {
	if (player === "player1") {
		that = $("#player-1-strip td.active").next()
		$("#player-1-strip td.active").removeClass("active")
		that.addClass("active")
	}
	else if (player === "player2") {
		that = $("#player-2-strip td.active").next()
		$("#player-2-strip td.active").removeClass("active")
		that.addClass("active")
	}
}
var checkForEnd = function() {
	if ($("#player-1-strip td.active").hasClass("end")) {
		alert("Player 1 wins!")
		$.ajax({
			url: "/finished/" + $(".player_1_id").data().player_one_id + "/" + $(".player_2_id").data().player_two_id + "/" + $(".game_id").data().game_id + "/player_1",
			type: "GET"
		})
		.done(function(response) {
			$("#finished").append(response)
		})
	}
	else if ($("#player-2-strip td.active").hasClass("end")) {
		alert("Player 2 wins!")
		$.ajax({
			url: "/finished/" + $(".player_1_id").data().player_one_id + "/" + $(".player_2_id").data().player_two_id + "/" + $(".game_id").data().game_id + "/player_2",
			type: "GET"
		})
		.done(function(response) {
			$("#finished").append(response)
		})
	} 
}

$(document).ready(function() {
	// alert("Press enter to begin")

	if($(".racer").length >= 1 ) {
		alert("Player one is 'Q', player two is 'P'. Press enter to begin game.")
	}


	$(document).on("keyup", function(event) {
		if (event.keyCode == 81) {
			updatePlayerPosition("player1")
			checkForEnd("player1")
		}
		else if (event.keyCode == 80) {
			updatePlayerPosition("player2")
			checkForEnd("player2")
		}
	})
})

