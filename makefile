.PHONY: all

ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

all: lender student 

lender:
	cd ${ROOT_DIR}/../$@/api/application; npm install && npm run lint
	cd ${ROOT_DIR}/../$@/api/contract; npm install && npm run lint

student:	
	cd ${ROOT_DIR}/../$@/api/application; npm install && npm run lint
	cd ${ROOT_DIR}/../$@/contract; npm install && npm run lint	