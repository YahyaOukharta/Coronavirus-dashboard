
if [ "$HOST" != "" ]
then
    sed -i "s/localhost/${HOST}/g" /corona/frontend/index.html
fi

cd frontend/
curl https://mdbootstrap.com/download/mdb-jquery/mdb-free/4141x24a1da1ae3dc3dd/MDB-Free_4.14.1.zip > mdb.zip
unzip mdb.zip -d mdb/
cd ..

cp index.html frontend/mdb/index.html
cp style.css frontend/mdb/css/style.css
cp frontend/Chart.min.js frontend/mdb/js/Chart.min.js

sed -i "s/localhost/${HOST}/g" /corona/frontend/mdb/index.html

#exec "bash"
       


node server.js