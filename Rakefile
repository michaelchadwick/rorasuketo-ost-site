task :deploy do
  sh 'git push origin master'
  sh 'hugo -b /'
  sh "rsync -auP --no-p --exclude-from='rsync-exclude.txt' ./public/ $RORASUKETO_REMOTE"
end

task :serve do
  sh 'open http://localhost:1313 && hugo -b http://localhost:1313 server -wD'
end

task default: [:deploy]
