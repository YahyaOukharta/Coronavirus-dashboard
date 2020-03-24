from alpine
expose 3000
run apk add git nodejs npm bash curl zip
COPY srcs/ /corona
COPY setup.sh /corona/setup.sh
WORKDIR /corona/
run npm install

ENTRYPOINT ["bash","setup.sh"]