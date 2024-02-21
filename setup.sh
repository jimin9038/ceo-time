set -ex

npm install -g pnpm@latest
pnpm install
pnpm install -g prisma
for i in {1..5}
do
  echo -e '\n⚠️ Failed to migrate. Waiting for db to be ready...\n'
  sleep 5
done
