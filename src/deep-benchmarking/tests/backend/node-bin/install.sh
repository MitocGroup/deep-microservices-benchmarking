#!/bin/bash

npm link chai &&\
npm link aws-sdk &&\
npm link node-dir &&\
npm link deepify &&\
ln -s ../../../backend/src/case ./node_modules &&\
ln -s ../../../backend/src/lambda ./node_modules
