#!/bin/bash

npm link chai &&\
npm link aws-sdk &&\
npm link node-dir &&\
npm link deepify &&\
ln -s ../../../Backend/src/Case ./node_modules &&\
ln -s ../../../Backend/src/Lambda ./node_modules
