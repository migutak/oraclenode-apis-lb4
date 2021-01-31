FROM oraclelinux:8-slim

LABEL "provider"="Oracle"                                               \
  "issues"="https://github.com/oracle/docker-images/issues"

ARG release=19
ARG update=9

RUN  microdnf install oracle-release-el8 && \
  microdnf install oracle-instantclient${release}.${update}-basic oracle-instantclient${release}.${update}-devel oracle-instantclient${release}.${update}-sqlplus && \
  microdnf install nodejs &&\
  microdnf clean all

# Uncomment if the tools package is added
# ENV PATH=$PATH:/usr/lib/oracle/${release}.${update}/client64/bin

# Create app directory (with user `node`)
RUN mkdir -p /app

WORKDIR /app
COPY package*.json ./

RUN npm install

# Bundle app source code
COPY . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=6001

EXPOSE ${PORT}
CMD [ "npm", "start" ]
# docker build -t 172.16.204.72:5100/oraclenode-apis-lb4:4.2
# docker build -t docker.io/migutak/oraclenode-apis-lb4:4.2

