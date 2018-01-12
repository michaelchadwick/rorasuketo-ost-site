task :repo do
  sh "git push origin master"
end

task :deploy do |t|
  sh "./deploy"
end

task :default => [:repo, :deploy]
