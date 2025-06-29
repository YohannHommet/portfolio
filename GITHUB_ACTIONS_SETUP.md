# 🚀 GitHub Actions Setup Guide

This document provides a comprehensive guide to the GitHub Actions workflows created for your portfolio website.

## 📋 Overview

The GitHub Actions setup includes three main workflows:

1. **🔍 Continuous Integration (CI)** - Code quality, testing, and validation
2. **🚀 Deployment** - Automated deployment to Netlify
3. **🔧 Maintenance** - Automated dependency updates and security monitoring

## 🔧 Required Setup

### 1. GitHub Secrets Configuration

You need to configure the following secrets in your GitHub repository:

#### **Repository Settings → Secrets and Variables → Actions**

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | [Netlify Account Settings](https://app.netlify.com/user/applications#personal-access-tokens) |
| `NETLIFY_SITE_ID` | Your Netlify site ID | Found in Site Settings → General → Site Details |
| `SITE_URL` | Your live website URL | e.g., `https://yohann-hommet.netlify.app` |

#### **Getting Netlify Credentials:**

1. **Netlify Auth Token:**
   - Go to [Netlify User Settings](https://app.netlify.com/user/applications)
   - Click "New access token"
   - Give it a name (e.g., "GitHub Actions")
   - Copy the token and add it as `NETLIFY_AUTH_TOKEN` secret

2. **Netlify Site ID:**
   - Go to your site's dashboard on Netlify
   - Navigate to Site Settings → General
   - Find "Site ID" under Site Details
   - Copy and add as `NETLIFY_SITE_ID` secret

### 2. Repository Permissions

Ensure the following permissions are enabled:

- **Actions** → General → Workflow permissions: "Read and write permissions"
- **Pull Requests** → Allow GitHub Actions to create and approve pull requests

## 🔍 Workflow Details

### 1. Continuous Integration (`.github/workflows/ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`
- Manual trigger via GitHub UI

**Jobs:**
- **📝 Code Quality**: HTML, CSS, and JavaScript linting
- **🏗️ Build & Test**: Production build validation and file size checks
- **🔒 Security & Performance Audit**: Dependency security scan and Lighthouse performance audit
- **♿ Accessibility Testing**: WCAG 2.1 AA compliance testing
- **🌐 Browser Compatibility**: Cross-browser testing simulation

**Key Features:**
- Parallel job execution for faster feedback
- Comprehensive file size and compression analysis
- Automated accessibility testing
- Performance benchmarking with Lighthouse

### 2. Deployment (`.github/workflows/deploy.yml`)

**Triggers:**
- Push to `main` branch
- Manual trigger with environment selection

**Jobs:**
- **🔍 Pre-deployment Checks**: Validation and commit message analysis
- **🏗️ Production Build**: Optimized build with integrity hashes
- **🌍 Deploy to Netlify**: Automated deployment with status reporting
- **✅ Post-deployment Verification**: Live site testing and performance validation
- **📢 Deployment Notification**: Success/failure notifications

**Key Features:**
- Skip deployment with `[skip deploy]` in commit message
- Automatic PR comments with preview URLs
- Post-deployment verification including security headers check
- Performance monitoring of live site

### 3. Maintenance (`.github/workflows/maintenance.yml`)

**Triggers:**
- Daily schedule (2 AM UTC)
- Manual trigger with task selection

**Jobs:**
- **📦 Dependency Updates**: Automated dependency updates with PR creation
- **🔒 Security Audit**: Vulnerability scanning with auto-fix attempts
- **📊 Performance Monitoring**: Regular performance audits
- **🧹 Cleanup Tasks**: Repository maintenance and statistics
- **📋 Maintenance Summary**: Comprehensive reporting

**Key Features:**
- Automated PR creation for updates
- Security vulnerability auto-fixing
- Performance regression detection
- Repository health monitoring

## 🛠️ Configuration Files

The workflows use several configuration files for code quality:

### HTML Linting (`.htmlhintrc`)
- Validates HTML5 compliance
- Enforces accessibility requirements
- Checks for common HTML issues

### CSS Linting (`.stylelintrc.json`)
- Ensures consistent CSS formatting
- Validates modern CSS practices
- Prevents common CSS mistakes

### HTML Validation (`.htmlvalidaterc.json`)
- Comprehensive HTML validation
- WCAG accessibility rules
- Semantic HTML enforcement

## 📊 Monitoring and Reporting

### Build Status Badges

Add these badges to your README.md:

```markdown
[![CI](https://github.com/YohannHommet/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/YohannHommet/portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/YohannHommet/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/YohannHommet/portfolio/actions/workflows/deploy.yml)
[![Maintenance](https://github.com/YohannHommet/portfolio/actions/workflows/maintenance.yml/badge.svg)](https://github.com/YohannHommet/portfolio/actions/workflows/maintenance.yml)
```

### Performance Monitoring

The workflows automatically:
- Monitor Lighthouse scores
- Track bundle sizes
- Check page load times
- Validate security headers

## 🚨 Troubleshooting

### Common Issues

1. **"Netlify deployment failed"**
   - Check if `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are correctly set
   - Verify token has proper permissions

2. **"Build artifacts not found"**
   - Ensure the build process completes successfully
   - Check if all required files are generated in the `dist` directory

3. **"Linting errors"**
   - Review the specific linting rules in configuration files
   - Fix code quality issues or adjust rules if necessary

4. **"Security audit failures"**
   - Review dependency vulnerabilities
   - Update dependencies or apply security patches

### Manual Workflow Triggers

You can manually trigger workflows:

1. Go to **Actions** tab in your repository
2. Select the workflow you want to run
3. Click **"Run workflow"**
4. Choose branch and options (if available)

## 🔄 Customization

### Modifying Workflows

To customize the workflows:

1. **Adjust Node.js version**: Change `NODE_VERSION` in workflow files
2. **Modify build commands**: Update the build steps in respective workflows
3. **Add new checks**: Extend existing jobs or add new ones
4. **Change schedule**: Modify the cron expression in maintenance workflow

### Adding New Linting Rules

1. **HTML**: Modify `.htmlhintrc` and `.htmlvalidaterc.json`
2. **CSS**: Update `.stylelintrc.json`
3. **JavaScript**: Add ESLint configuration if needed

### Performance Thresholds

Adjust performance thresholds in the workflows:
- File size limits
- Lighthouse score requirements
- Page load time expectations

## 📈 Best Practices

### Commit Messages

Use conventional commit messages for better automation:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### Branch Strategy

Recommended branch strategy:
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches
- `hotfix/*`: Critical fixes

### Security

- Regularly review and rotate access tokens
- Monitor security audit results
- Keep dependencies updated
- Review automated PRs before merging

## 🎯 Next Steps

1. **Set up required secrets** in GitHub repository settings
2. **Test workflows** by making a test commit
3. **Review and merge** any automated PRs created by maintenance workflow
4. **Monitor performance** and adjust thresholds as needed
5. **Customize workflows** based on your specific requirements

## 📞 Support

If you encounter issues:
1. Check the **Actions** tab for detailed logs
2. Review this documentation
3. Check GitHub Actions documentation
4. Verify all secrets are correctly configured

---

**Happy coding! 🚀**