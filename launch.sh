# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

docker-compose -f webapp/docker-compose.yml down
docker-compose -f webapp/docker-compose.yml up -d
docker ps -a
