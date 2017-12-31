FROM node:6

RUN echo 'deb http://mirrors.aliyun.com/debian/ jessie-backports firefox-release' > /etc/apt/sources.list.d/debian-mozilla.list && \
    wget https://mozilla.debian.net/pkg-mozilla-archive-keyring_1.1_all.deb && \
    dpkg -i pkg-mozilla-archive-keyring_1.1_all.deb && \
    apt-get update && \
    apt-get install -y xvfb firefox fonts-takao fonts-wqy-zenhei

RUN npm install -g slimerjs phantomjs https://github.com/adaikiss/manet.git

COPY bin/startup.sh /usr/local/bin/startup.sh

EXPOSE 8891

ENTRYPOINT ["startup.sh", "--host=0.0.0.0 "]
CMD ["--engine=slimerjs"]
