docker rm -f con
docker build . -t img

docker run -it -p 3000:3000 -e HOST=$(dig @resolver1.opendns.com ANY myip.opendns.com +short) --name con img:latest
