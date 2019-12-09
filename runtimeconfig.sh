#!/bin/ash

function join_by { local IFS="$1"; shift; echo "$*"; }

echo I am $(whoami)

# Find vue env vars
vars=$(env | grep VUE_APP_ | awk -F = '{print "$"$1}')
vars=$(join_by ',' $vars)
echo "Found variables $vars"

for file in /usr/share/nginx/html/static/js/app.*.js;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst "$vars" < $file.tmpl.js > $file
  rm $file.tmpl.js
done

echo "Starting nginx"
nginx -g 'daemon off;'

