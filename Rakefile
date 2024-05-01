task :deploy do |t|
  sh "git push origin master"
  sh "hugo -b $RORASUKETO_PROD_URL"
  sh "rsync -auP --no-p --exclude-from='rsync-exclude.txt' ./public/ $RORASUKETO_REMOTE"
end

task :serve do |t|
  sh "open http://localhost:1313 && hugo -b http://localhost:1313 server -wD"
end

task :default => [:deploy]
