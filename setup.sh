#!/usr/bin/env bash

set -ex

if [ ! $(command -v npm) ]
then
  echo "Error: npm is not installed. Please install npm first."
  exit 1
fi

BASEDIR=$(dirname $(realpath $0))

cd $BASEDIR

# Write .env file from .env.development
if [ -f .env ]
then
  rm .env
fi

while IFS= read -r line
do
  # Skip empty lines or comments
  if [[ -z "$line" || ${line:0:1} == '#' ]]
  then
    continue
  fi

  name=${line%%=*}
  value=${line#*=}

  if [[ -v "$name" ]]
  then
      echo "$name=${!name}" >> .env
  else
      echo "$name=$value" >> .env
  fi
done < .env.development

# If dotenv schema is not updated, remove the file
if [ -f backend/.env ] && grep -q DATABASE_URL backend/.env
then
  rm backend/.env
fi

# If .env does not exist, create one
if [ ! -f backend/.env ]
then
  echo "JWT_SECRET=$(head -c 64 /dev/urandom | LC_ALL=C tr -dc A-Za-z0-9 | sha256sum | head -c 64)" >> backend/.env
fi

npm install -g pnpm@latest
pnpm install
pnpm install -g prisma

# Apply database migration
for i in {1..5}
do
  pnpm --filter backend exec prisma migrate dev && break # break if migration succeed
  echo -e '\n⚠️ Failed to migrate. Waiting for db to be ready...\n'
  sleep 5
done

# Allow direnv
cd $BASEDIR
direnv allow
