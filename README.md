# vuethwallet
[![Build Status](https://travis-ci.org/sc0Vu/vuethwallet.svg?branch=master)](https://travis-ci.org/sc0Vu/vuethwallet)

A simple app using eth-lightwallet and vuejs to generate ethereum wallet.

# Usage

    clone the repo

    npm install

    npm run dev

Have fun with vue-ethereum wallet app.

# Router

1. /

create wallet with user password

2. /wallet-seed

create wallet with user password and user seed(12 words)

3. /import-keystore

import wallet from keystore.json

4. /contract-transaction

make contract transaction

5. /value-transaction

make value transaction

# Test

1. unit

    npm run unit

2. e2e

    npm run e2e

3. all

    npm run test

# Demo

Deployed on heroku (build branch): [demo](https://vuethwallet.herokuapp.com/)

![demo-image](https://user-images.githubusercontent.com/10494397/27172628-80f4fba2-51e8-11e7-9368-e89d56e7f422.gif)
