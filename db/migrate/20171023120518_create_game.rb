class CreateGame < ActiveRecord::Migration[5.0]
  def change
  	create_table :games do |t|
  		t.string :winner
  		t.integer :time
  		t.integer :player_1_id
  		t.integer :player_2_id
  		
  		t.timestamps
  	end
  end
end
