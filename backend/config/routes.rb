require 'sidekiq/web'
Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  mount Sidekiq::Web => '/sidekiq'
  post "/graphql", to: "graphql#execute"
end
