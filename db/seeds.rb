# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Stock.create([ { company: 'Apple', stock_symbol: 'AAPL' },
                        { company: 'Alphabet', stock_symbol: 'GOOG' },
                        { company: 'Facebook', stock_symbol: 'FB' },
                        { company: 'Netflix', stock_symbol: 'NFLX' }
                ])

stocks = Stock.all

stocks.each do |s|
  prng = Random.new
  100.times do |i|
    s.trends.create(price: prng.rand(100..500), price_date: (Date.current - (i).day))
  end
end
