get "/" do
	erb :index
end

get "/play/:player_1/:player_2" do
	@game = Game.create(winner: nil, time: nil, player_1_id: params[:player_1], player_2_id: params[:player_2])
	@winner = Player.find_by(id: @game.winner)
	@player_1 = Player.find_by(id: params[:player_1])
	@player_2 = Player.find_by(id: params[:player_2])
	erb :racer
end

post "/user" do
	@player_1 = Player.find_or_create_by(name: params[:player_1])
	@player_2 = Player.find_or_create_by(name: params[:player_2])
	redirect "/play/#{@player_1.id}/#{@player_2.id}"
end

get "/stats/:game_id" do
	@game = Game.find_by(id: params[:game_id])
	@winner = Player.find_by(id: (@game.winner).to_i)
	@player_1 = Player.find_by(id: @game.player_1_id)
	@player_2 = Player.find_by(id: @game.player_2_id)
	erb :stats
end

get "/finished/:player_1/:player_2/:game_id/:winner" do
	@player_1 = Player.find_by(id: params[:player_1])
	@player_2 = Player.find_by(id: params[:player_2])
	@game = Game.find_by(id: params[:game_id])
	if params[:winner] == "player_1"
		@game.update(winner: (@player_1.id), time: @time)
	elsif params[:winner] == "player_2"
		@game.update(winner: (@player_2.id), time: @time)
	@time = @game.updated_at - @game.created_at
	@game.update(time: @time)
	end
	erb :finished, layout: false
end