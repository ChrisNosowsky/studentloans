#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0



docker rm $(docker ps -a -q)
docker rmi $(docker ps -q) 
cd lender/api/cli
docker-compose down
cd ..
cd ..
cd ..
cd student/api/cli
docker-compose down
cd ..
cd ..
cd ..
