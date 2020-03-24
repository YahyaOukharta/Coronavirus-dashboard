from alpine
expose 3000
run apk add git nodejs npm bash curl zip
COPY srcs/ /corona
COPY setup.sh /corona/setup.sh
WORKDIR /corona/
run npm install

COPY index.html /corona
COPY style.css /corona

ENTRYPOINT ["bash","setup.sh"]