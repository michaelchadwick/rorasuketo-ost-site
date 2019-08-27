task :deploy

task :deploy do |t|
  sh "git push"
  sh "hugo"
  sh "dandelion deploy"
end

task :default => [:deploy]
