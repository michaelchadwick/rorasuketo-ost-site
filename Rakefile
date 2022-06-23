task :deploy do |t|
  sh "git push origin master"

  sh "hugo"

  sh "rsync -auP --exclude-from='rsync-exclude.txt' ./public/ $RORASUKETO_REMOTE"
end

task :default => [:deploy]
