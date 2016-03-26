class Stock < ActiveRecord::Base
  has_many :trends
end