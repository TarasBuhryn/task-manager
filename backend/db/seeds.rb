Task.destroy_all
Project.destroy_all

project1 = Project.create!(name: 'Project 1')
project2 = Project.create!(name: 'Project 2')

5.times do |i|
  project1.tasks.create!(name: "Task #{i + 1} for first project #{(Time.now - 5.hours + i.hour).strftime('%H:%M:%S')}")
  project2.tasks.create!(name: "Task #{i + 1} for second project#{(Time.now - 5.hours + i.hour).strftime('%H:%M:%S')}")
end

puts 'Database seeded successfully!'
