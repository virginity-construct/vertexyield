# VertexYield Deployment Guide

This guide provides instructions for deploying the VertexYield landing page to various hosting platforms and setting up the custom domain (vertexyield.xyz).

## Deployment Options

### Option 1: GitHub Pages

1. Push your repository to GitHub
2. Go to Settings > Pages
3. Select the branch to deploy (usually `main` or `master`)
4. Click Save

### Option 2: Netlify

1. Sign up for a Netlify account
2. Click "New site from Git"
3. Connect to your GitHub repository
4. Configure build settings (not required for static sites)
5. Click "Deploy site"

### Option 3: Vercel

1. Sign up for a Vercel account
2. Import your GitHub repository
3. Configure project settings
4. Deploy

## Custom Domain Setup (vertexyield.xyz)

### Step 1: Purchase Domain

If you haven't already purchased the domain:
1. Go to a domain registrar (Namecheap, GoDaddy, etc.)
2. Purchase vertexyield.xyz

### Step 2: DNS Configuration

#### For GitHub Pages:

Add these DNS records at your domain registrar:
- A record: @ → 185.199.108.153
- A record: @ → 185.199.109.153
- A record: @ → 185.199.110.153
- A record: @ → 185.199.111.153
- CNAME record: www → yourusername.github.io

#### For Netlify:

Add these DNS records at your domain registrar:
- CNAME record: @ → your-netlify-site-name.netlify.app
- CNAME record: www → your-netlify-site-name.netlify.app

Alternatively, use Netlify DNS by updating your domain's nameservers.

#### For Vercel:

Add these DNS records at your domain registrar:
- A record: @ → 76.76.21.21
- CNAME record: www → cname.vercel-dns.com

### Step 3: Configure Custom Domain in Hosting Platform

#### GitHub Pages:
1. Go to repository Settings > Pages
2. Enter your custom domain
3. Save
4. Check "Enforce HTTPS"

#### Netlify:
1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow verification steps
5. Enable HTTPS

#### Vercel:
1. Go to Project settings > Domains
2. Add your domain
3. Verify ownership
4. HTTPS is enabled by default

### Step 4: Verify Setup

1. Wait for DNS propagation (can take up to 48 hours)
2. Visit your domain to ensure it's working
3. Check that HTTPS is working properly

## Maintenance

### SSL Certificate Renewal

- GitHub Pages, Netlify, and Vercel handle SSL certificate renewal automatically
- If using a different host, set a reminder to renew certificates before expiration

### Domain Renewal

- Set up auto-renewal for your domain to prevent expiration
- Keep payment information up to date with your domain registrar
