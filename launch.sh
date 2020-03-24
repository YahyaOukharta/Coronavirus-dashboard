docker rm -f con
docker build . -t img
docker run -it -p 3000:3000 -e HOST=100.26.194.175 --name con img:latest
