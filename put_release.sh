#!/bin/bash

# Wczytaj główny plik .env, jeśli istnieje
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Wczytaj plik .env.local, jeśli istnieje (lub dowolny inny plik .env*)
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

curl -XPUT ${URL}/release \
--data '{"message":"release 1.0.1","id": "1.0.1"}' -H "Content-Type: application/json"