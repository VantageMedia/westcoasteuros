#!/bin/bash

echo "🚀 West Coast Euros Theme Development Setup"
echo "=========================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🎨 Starting development server..."
echo "📁 Edit your theme files in:"
echo "   - templates/ (page templates)"
echo "   - sections/ (theme sections)"
echo "   - assets/ (CSS, JS, images)"
echo "   - layout/ (theme layouts)"
echo ""
echo "🌐 Development server will be available at: http://localhost:3000"
echo "🔄 Changes will be reflected automatically"
echo ""
echo "📤 To deploy changes to Vercel:"
echo "   ./deploy.sh"
echo ""

# Start the development server
node dev-server.js
