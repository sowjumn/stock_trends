class Trends < ActiveRecord::Migration
  def change
    create_table :trends do |t|
      t.integer :stock_id
      t.integer :price
      t.date :price_date
    end
  end
end
