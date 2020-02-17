#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0

function _exit(){
    printf "Exiting:%s\n" "$1"
    exit -1
}

# Exit on first error, print all commands.
set -ev
set -o pipefail

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
echo $DIR
cd "$GOPATH/src/github.com/hyperledger/fabric-samples/basic-network/"

docker kill cliLender cliStudent logspout || true
./teardown.sh || true
./start.sh || _exit "Failed to start Fabric"



# -------------------------------------------------------------------------------
#
# Good to start the applications in other terminals
#
"${DIR}/lender/api/cli/monitordocker.sh" net_basic