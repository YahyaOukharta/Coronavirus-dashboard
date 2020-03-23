
if [ "$HOST" != "" ]
then
    sed -i "s/localhost/${HOST}/g" /corona/frontend/index.html
fi
#exec "bash"
node server.js