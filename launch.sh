docker rm -f con
docker build . -t img
docker run -it -p 3000:3000 -e HOST=34.201.38.118 --name con img:latest