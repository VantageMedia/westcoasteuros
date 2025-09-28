#!/bin/bash

# West Coast Euros Black Friday Landing Page Deployment Script
# This script will help you deploy to GitHub and Vercel

echo "🚀 West Coast Euros Black Friday Landing Page Deployment"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git remote add origin https://github.com/VantageMedia/westcoasteuros.git
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "🎯 Add Black Friday landing page with brand colors and mobile optimization

- Custom hero section with countdown timer
- Brand colors: Toasted Yellow, Cream White, Galaxy Black
- Mobile-first responsive design
- Interactive features and urgency elements
- Social proof and testimonials
- Optimized for young car enthusiasts (teens-mid 20s)"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo "🔗 Repository: https://github.com/VantageMedia/westcoasteuros.git"
echo ""

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    echo ""
    echo "🎉 Deployment complete!"
    echo "📱 Preview your Black Friday landing page at the Vercel URL above"
    echo ""
    echo "📋 Next steps:"
    echo "1. Test the live preview on Vercel"
    echo "2. Follow BLACK_FRIDAY_SETUP.md to integrate with Shopify"
    echo "3. Upload images and configure collections"
    echo "4. Set your countdown timer end date"
    echo ""
else
    echo "⚠️  Vercel CLI not found. Install it with: npm i -g vercel"
    echo "Then run: vercel --prod"
    echo ""
fi

echo "🎯 Black Friday Landing Page Features:"
echo "- Compelling hero with countdown timer"
echo "- Lifestyle/aspirational content"
echo "- Curated best sellers (not overwhelming)"
echo "- Social proof from young car enthusiasts"
echo "- Mobile-optimized for target demographic"
echo "- Brand colors throughout"
echo ""
echo "📖 See BLACK_FRIDAY_SETUP.md for detailed setup instructions"
