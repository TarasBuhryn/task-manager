class GenerateTaskJob < ApplicationJob
  queue_as :default

  def perform
    Project.find_each do |project|
      task = project.tasks.create!(name: "New Task #{Time.current.strftime('%H:%M:%S')}")
      BackendSchema.subscriptions.trigger(:task_added, {}, task)
    end
  end
end
