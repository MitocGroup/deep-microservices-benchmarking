#!/bin/bash

npm link chai &&\
npm link aws-sdk &&\
npm link node-dir &&\
npm link deepify &&\
ln -s ../../../Backend/src/CaseWithoutBabel ./node_modules &&\
ln -s ../../../Backend/src/CaseWithBabel ./node_modules &&\
ln -s ../../../Backend/src/CaseUnusedCode ./node_modules &&\
ln -s ../../../Backend/src/CaseUsedCode ./node_modules &&\
ln -s ../../../Backend/src/CaseWithFramework ./node_modules &&\
ln -s ../../../Backend/src/CaseWithoutFramework ./node_modules &&\
ln -s ../../../Backend/src/LambdaSizeRetrieve ./node_modules
