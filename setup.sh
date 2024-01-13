set -ex

npm install -g pnpm@latest
pnpm install

for i in {1..5}
do
  pnpm --filter backend exec prisma migrate dev && break
  echo -e '\n⚠️ Failed to migrate. Waiting for db to be ready...\n'
  sleep 5
done