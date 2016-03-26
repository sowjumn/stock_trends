class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
      t.string :company
      t.string :stock_symbol
    end
  end
end
