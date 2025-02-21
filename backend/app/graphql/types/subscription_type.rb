module Types
    class SubscriptionType < Types::BaseObject
      field :task_added, Types::TaskType, null: false, description: "A new task was added!"
  
      def task_added
        object
      end
    end
  end