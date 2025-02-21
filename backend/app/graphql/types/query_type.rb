# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :projects, [Types::ProjectType], null: false do
      description "Retrieve all projects"
    end

    def projects
      Project.all
    end
  end
end
