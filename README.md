# CS-686 Assignment 2: GitHub Profile Page

A professional cybersecurity-focused profile page with automated versioning, conventional commits, and CI/CD deployment to GitHub Pages.

## Overview

This repository demonstrates modern development practices including:
- Automated semantic versioning
- Conventional commit enforcement
- AI-assisted commit message generation
- Automated changelog generation
- Continuous deployment to GitHub Pages

## Project Structure

```
cs-686-assignment2/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── .husky/
│   └── commit-msg              # Git hook for commit message validation
├── .commitlintrc.json          # Commitlint configuration
├── .gitignore                  # Git ignore patterns
├── ai-commit.sh                # AI-assisted commit helper script
├── index.html                  # Main profile page
├── package.json                # Node.js dependencies and scripts
└── README.md                   # This file
```

## Dependencies

### Development Dependencies

#### 1. **@commitlint/cli** (^18.4.3)
- **Purpose**: Validates commit messages against conventional commit format
- **Usage**: Automatically runs via husky pre-commit hook
- **Why it matters**: Ensures consistent commit history for automated changelog generation

#### 2. **@commitlint/config-conventional** (^18.4.3)
- **Purpose**: Provides the conventional commit ruleset for commitlint
- **Rules enforced**:
  - `type(scope?): description` format
  - Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, etc.
  - Subject must be lowercase
  - No period at the end of subject
- **Example valid commits**:
  ```
  feat: add hero section to profile page
  fix(css): resolve responsive layout issues
  docs: update README with setup instructions
  ```

#### 3. **husky** (^8.0.3)
- **Purpose**: Git hooks manager that runs scripts before git operations
- **Configuration**: `.husky/commit-msg` hook runs commitlint on every commit
- **Benefit**: Prevents invalid commits from entering the repository

#### 4. **standard-version** (^9.5.0)
- **Purpose**: Automates semantic versioning and changelog generation
- **What it does**:
  - Analyzes conventional commits to determine version bump (major.minor.patch)
  - Generates/updates CHANGELOG.md
  - Creates version git tags
  - Updates package.json version
- **Versioning rules**:
  - `feat:` commits → minor version bump (0.1.0 → 0.2.0)
  - `fix:` commits → patch version bump (0.1.0 → 0.1.1)
  - `BREAKING CHANGE:` or `!` → major version bump (0.1.0 → 1.0.0)

## Workflow Explanation

### 1. Local Development Workflow

#### Traditional Commit Flow
```bash
# Make changes to your files
git add .
git commit -m "feat: add new section to profile"
# Husky runs commitlint automatically
# If commit message is invalid, commit is rejected
```

#### AI-Assisted Commit Flow
```bash
# Run the AI commit helper script
./ai-commit.sh

# The script will:
# 1. Stage all changes (git add .)
# 2. Generate a git diff
# 3. Copy the diff to your clipboard
# 4. Prompt you to get an AI-generated commit message
# 5. Apply the commit with the AI-suggested message
```

### 2. Automated CI/CD Pipeline

When you push to the `main` branch, GitHub Actions automatically:

#### Job 1: Version and Changelog
1. **Checkout**: Fetches full git history
2. **Setup Node.js**: Installs Node.js 20
3. **Configure Git**: Sets up bot credentials for commits
4. **Install Dependencies**: Runs `npm ci` to install exact package versions
5. **Generate Version**: Runs `standard-version` which:
   - Analyzes commits since last tag
   - Determines version bump based on commit types
   - Updates CHANGELOG.md
   - Updates package.json version
   - Creates a git tag (e.g., v1.2.0)
   - Pushes changes and tags back to main branch

#### Job 2: Deploy to GitHub Pages
1. **Checkout**: Fetches latest code (including version updates)
2. **Setup Pages**: Configures GitHub Pages settings
3. **Upload Artifact**: Packages entire repository
4. **Deploy**: Publishes to GitHub Pages

### 3. Commit Message Enforcement

The `.husky/commit-msg` hook validates every commit message:

```bash
# Valid commits (will succeed):
git commit -m "feat: add contact form"
git commit -m "fix: resolve mobile navigation bug"
git commit -m "docs: update installation guide"
git commit -m "style: format code with prettier"
git commit -m "refactor: simplify authentication logic"
git commit -m "test: add unit tests for API"
git commit -m "chore: update dependencies"

# Invalid commits (will fail):
git commit -m "updated stuff"           # No type
git commit -m "feat:added feature"      # Missing space after colon
git commit -m "Feat: new thing"         # Type should be lowercase
git commit -m "feat: Add feature."      # Subject should be lowercase, no period
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cs-686-assignment2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize Husky hooks**
   ```bash
   npx husky install
   ```

4. **Make ai-commit.sh executable** (if needed)
   ```bash
   chmod +x ai-commit.sh
   ```

### First-Time Setup for GitHub Pages

1. Go to repository Settings → Pages
2. Source: Select "GitHub Actions"
3. The workflow will automatically deploy on push to main

## Usage

### Making Commits

**Option 1: Manual conventional commits**
```bash
git add .
git commit -m "feat: add skills section"
```

**Option 2: AI-assisted commits**
```bash
./ai-commit.sh
# Follow prompts to generate AI-powered commit message
```

### Creating a Release

Releases are automated via GitHub Actions, but you can also create one locally:

```bash
npm run release
git push --follow-tags origin main
```

This will:
- Bump version based on commits
- Update CHANGELOG.md
- Create a git tag
- Push everything to remote

### Viewing the Deployed Site

After a successful deployment, your site will be available at:
```
https://<username>.github.io/cs-686-assignment2/
```

## Conventional Commit Types

| Type | Description | Version Impact |
|------|-------------|----------------|
| `feat` | New feature | Minor (0.x.0) |
| `fix` | Bug fix | Patch (0.0.x) |
| `docs` | Documentation only | None |
| `style` | Code style changes (formatting, whitespace) | None |
| `refactor` | Code refactoring (no functional changes) | None |
| `perf` | Performance improvements | Patch |
| `test` | Adding or updating tests | None |
| `build` | Build system or external dependencies | None |
| `ci` | CI/CD configuration changes | None |
| `chore` | Other changes (maintenance, configs) | None |
| `revert` | Revert a previous commit | Depends |

## Troubleshooting

### Commit Rejected by Commitlint

**Error**: `subject may not be empty [subject-empty]`
**Fix**: Ensure your commit message follows the format `type: description`

**Error**: `type may not be empty [type-empty]`
**Fix**: Start your message with a valid type (feat, fix, docs, etc.)

### Husky Hook Not Running

**Fix**: Reinstall husky hooks
```bash
rm -rf .husky
npx husky install
```

### Standard-Version Fails

**Issue**: No commits since last tag
**Fix**: Ensure you have conventional commits to release

### GitHub Actions Deploy Fails

**Check**:
1. GitHub Pages is enabled in repository settings
2. Workflow has necessary permissions (set in deploy.yml)
3. Check Actions tab for detailed error logs

## Project Goals

This repository demonstrates:
- ✅ Automated semantic versioning
- ✅ Conventional commit enforcement
- ✅ Automated changelog generation
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Professional development workflow
- ✅ AI integration for commit message generation

## License

This project is for educational purposes as part of CS-686 Assignment 2.