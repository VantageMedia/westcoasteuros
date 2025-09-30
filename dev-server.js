const express = require('express');
const path = require('path');
const fs = require('fs');
const { Liquid } = require('liquidjs');

const app = express();
const port = 3000;

// Set up Liquid template engine
const engine = new Liquid({
  root: path.resolve(__dirname),
  extname: '.liquid'
});

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/config', express.static(path.join(__dirname, 'config')));
app.use('/locales', express.static(path.join(__dirname, 'locales')));

// Mock Shopify data for development
const mockData = {
  shop: {
    name: 'West Coast Euros',
    domain: 'westcoasteuros.myshopify.com'
  },
  collections: {
    'new-arrivals': {
      title: 'New Arrivals',
      products: [
        { title: 'WCE S58 Downpipes', price: '$549.00', image: '/assets/placeholder.jpg' },
        { title: 'Carbon Fiber Front Lip', price: '$799.00', image: '/assets/placeholder.jpg' },
        { title: 'Mirror Caps', price: '$449.00', image: '/assets/placeholder.jpg' },
        { title: 'CSL Style Grille', price: '$899.00', image: '/assets/placeholder.jpg' }
      ]
    }
  },
  settings: {
    typography_headings: { family: 'Arial' },
    typography_body: { family: 'Arial' }
  }
};

// Main route - render the index template
app.get('/', async (req, res) => {
  try {
    const template = await engine.parseFile('templates/index.json');
    const html = await engine.render(template, mockData);
    res.send(html);
  } catch (error) {
    console.error('Error rendering template:', error);
    res.status(500).send('Error rendering template');
  }
});

// Serve individual sections
app.get('/sections/:section', async (req, res) => {
  try {
    const sectionName = req.params.section;
    const sectionPath = path.join(__dirname, 'sections', `${sectionName}.liquid`);
    
    if (fs.existsSync(sectionPath)) {
      const template = await engine.parseFile(sectionPath);
      const html = await engine.render(template, mockData);
      res.send(html);
    } else {
      res.status(404).send('Section not found');
    }
  } catch (error) {
    console.error('Error rendering section:', error);
    res.status(500).send('Error rendering section');
  }
});

app.listen(port, () => {
  console.log(`🚀 West Coast Euros Development Server running at http://localhost:${port}`);
  console.log(`📁 Edit your theme files and see live changes!`);
  console.log(`🎨 Theme files: templates/, sections/, assets/, layout/`);
});
