const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add cache control headers to prevent caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// API Routes
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    // Log the submission to a file (for demo purposes)
    // In production, you would use a database or email service
    const submissionData = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      service,
      message
    };
    
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    
    const submissionsPath = path.join(dataDir, 'submissions.json');
    let submissions = [];
    
    if (fs.existsSync(submissionsPath)) {
      const fileData = fs.readFileSync(submissionsPath, 'utf8');
      submissions = JSON.parse(fileData);
    }
    
    submissions.push(submissionData);
    fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));
    
    res.status(200).json({
      success: true,
      message: 'Form submission received successfully'
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your submission'
    });
  }
});

// API endpoint for drone data
app.get('/api/drones', (req, res) => {
  const droneData = [
    {
      id: 'autonomyx-pro',
      name: 'AutonomyX Pro',
      description: 'Edge AI computing platform',
      specs: {
        processor: 'Neural Engine 5.0',
        flightTime: '35 minutes',
        ram: '32 GB LPDDR5',
        visionSystem: '360° 4D Perception',
        decisionRate: '500 Hz',
        neuralPathways: '24 billion'
      },
      idealFor: [
        'Complex Navigation',
        'Object Recognition',
        'Autonomous Missions'
      ],
      image: 'images/obj model training.jpg'
    },
    {
      id: 'neural-navigator',
      name: 'Neural Navigator 5',
      description: 'Self-learning flight system',
      specs: {
        processor: 'Cognitive Core 3.0',
        flightTime: '28 minutes',
        ram: '16 GB LPDDR5',
        visionSystem: '270° Perception',
        decisionRate: '300 Hz',
        neuralPathways: '12 billion'
      },
      idealFor: [
        'Urban Navigation',
        'Environmental Mapping',
        'Emergency Response'
      ],
      image: 'images/WhatsApp Image 2025-05-02 at 09.29.30_55b67871.jpg'
    },
    {
      id: 'smartsense',
      name: 'SmartSense 600',
      description: 'Environmental analysis system',
      specs: {
        processor: 'Eco Sentinel AI',
        flightTime: '40 minutes',
        ram: '24 GB LPDDR5',
        sensors: 'Multi-spectrum array',
        dataProcessing: '850 MB/s',
        connectivity: '5G + Satellite'
      },
      idealFor: [
        'Environmental Monitoring',
        'Disaster Assessment',
        'Research Applications'
      ],
      image: 'images/Screenshot 2025-05-14 125241.jpg'
    }
  ];
  
  res.json(droneData);
});

// Catch-all route to serve the main index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
