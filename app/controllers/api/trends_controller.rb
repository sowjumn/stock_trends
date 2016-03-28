class Api::TrendsController < ApplicationController
  def index
    @stock = Stock.find_by(stock_symbol: trend_params[:stock_id].upcase)
    @stock_trends = @stock ? @stock.trends.where('price_date <= ?', Date.current).select(:price, :price_date).order('price_date asc') : []
    render json: @stock_trends
  end

  private

  def trend_params
    params.permit(:stock_id)
  end
end