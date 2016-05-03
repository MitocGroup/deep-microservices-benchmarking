#!/bin/bash

[ -e "./node_modules/deepify" ] && rm -f "./node_modules/deepify";

[ -e "./node_modules/CaseWithoutBabel" ] && rm -f "./node_modules/CaseWithoutBabel";

[ -e "./node_modules/CaseWithBabel" ] && rm -f "./node_modules/CaseWithBabel";

[ -e "./node_modules/CaseUnusedCode" ] && rm -f "./node_modules/CaseUnusedCode";

[ -e "./node_modules/CaseUsedCode" ] && rm -f "./node_modules/CaseUsedCode";

[ -e "./node_modules/CaseWithFramework" ] && rm -f "./node_modules/CaseWithFramework";

[ -e "./node_modules/CaseWithoutFramework" ] && rm -f "./node_modules/CaseWithoutFramework";

[ -e "./node_modules/LambdaSizeRetrieve" ] && rm -f "./node_modules/LambdaSizeRetrieve";


exit 0
