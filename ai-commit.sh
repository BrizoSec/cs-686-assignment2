#!/bin/bash

# Stage changes
git add .

# Get diff
DIFF=$(git diff --cached)

# Use AI to generate commit message (you can use Claude API or this prompt)
echo "Generating conventional commit message with AI..."

# For now, interactive - you paste the diff to Claude and it suggests the commit
echo "$DIFF" | pbcopy
echo "Diff copied to clipboard. Ask Claude for a conventional commit message."
read -p "Enter the AI-generated commit message: " COMMIT_MSG

# Commit
git commit -m "$COMMIT_MSG"
