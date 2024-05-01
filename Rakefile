task :deploy do |t|
  sh "git push origin master"
  sh "hugo"
  sh "rsync -auP --no-p --exclude-from='rsync-exclude.txt' ./public/ $RORASUKETO_REMOTE"
end

task :serve do |t|
  sh "open http://localhost:1313/audio/rora && hugo server"
end

task :default => [:deploy]
