class WelcomeController < ApplicationController
  def index
    @stocks = Stock.all
    @apple = Stock.find_by(company: 'Apple')
    @apple_data = @apple.trends
  end
end