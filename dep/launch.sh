docker rm -f con
docker build . -t img
docker run -it -p 3000:3000 -e HOST=3.91.42.233 --name con img:latest
