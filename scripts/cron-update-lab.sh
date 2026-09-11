#!/usr/bin/env bash
set -e

export PATH="/home/ps012/.nvm/versions/node/v20.20.1/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export HOME="/home/ps012"

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR"

echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] Lab status update triggered ==="

# 1. Fetch latest node data
npm run cluster:fetch

# 2. Check if lab-status.json was modified
if git status --porcelain | grep -q 'lab-status.json'; then
  git add public/data/lab-status.json src/data/lab-status.json
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
  git commit -m "chore: auto-update lab status [${TIMESTAMP}] [skip ci]"
  git push origin main
  echo "Successfully pushed updated lab status to GitHub."
else
  echo "No changes in lab status."
fi

echo "=== Completed at $(date '+%Y-%m-%d %H:%M:%S') ==="
