class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    stream_from "graphql_subscriptions"
  end
end
