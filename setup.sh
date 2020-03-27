


cd frontend/
curl https://mdbootstrap.com/download/mdb-jquery/mdb-free/4141x24a1da1ae3dc3dd/MDB-Free_4.14.1.zip > mdb.zip
unzip mdb.zip -d mdb/
cd ..

if [ "$HOST" != "" ]
then
    sed -i "s/localhost/${HOST}/g" /corona/frontend/init_graphs.js
fi

cp index.html frontend/mdb/index.html
cp style.css frontend/mdb/css/style.css
cp frontend/Chart.min.js frontend/mdb/js/Chart.min.js
cp frontend/moment.js frontend/mdb/js/moment.js
cp frontend/init_graphs.js frontend/mdb/init_graphs.js



#exec "bash"
       


node server.js