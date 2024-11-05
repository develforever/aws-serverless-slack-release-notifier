# Slack release notifier - AWS Lamda and Serverless

Author: Robert Jamróz <rockfade@gmail.com>

This simple app makes Slack notification if new release info is send.

## Usage

Create `.env` and `.env.local` files.

```shell
nvm use 18.20.4
npm i -g serverless
npm i
serverless deploy
bash put_release.sh
```