#! /usr/bin/env bash
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Starting Mongodb"
mkdir $BASEDIR/mongodb &> /dev/null
touch $BASEDIR/mongodb/mongod.log
mongod --bind_ip 127.0.0.1 --port 1337 --dbpath $BASEDIR/mongodb --logpath $BASEDIR/mongodb/mongod.log --auth --quiet --logappend &
echo "Starting Intranet"
node $BASEDIR/intranet.js
