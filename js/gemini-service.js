const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize the Google Generative AI with your API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is not defined in .env file');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Project information to provide context to the AI
const projectInfo = {
  name: "DroneNav - Autonomous Drone Navigation System",
  description: "An autonomous drone navigation system with obstacle avoidance capabilities",
  team: [
    {
      name: "Moin",
      bio: "Specializes in AI algorithms and research methodology"
    },
    { 
      name: "Asad", 
      role: "Computer Vision & Embedded Engineer",
      responsibilities: "Development of vision algorithms and embedded systems integration",
      bio: "Expert in computer vision systems and embedded object recognition"
    },
    { 
      name: "Asim", 
      role: "Hardware Engineer",
      responsibilities: "Drone hardware assembly, sensor integration, and system testing",
      bio: "Designs and implements drone hardware components"
    },
    { 
      name: "Usama", 
      role: "Power System Engineer",
      responsibilities: "Power management systems, battery optimization, and electrical components",
      bio: "Specializes in power management and battery optimization"
    }
  ],
  supervisor: {
    name: "Lec. Abdul Basit Taj",
    role: "Project Supervisor",
    department: "Engineering Department",
    remarks: "Guided the team through the innovation process and provided critical insights on autonomous systems design."
  },
  technologies: [
    "Computer Vision with YOLOv8 object detection",
    "Custom CNN models for obstacle detection",
    "Machine Learning for environmental adaptation",
    "Advanced Path Planning algorithms",
    "Autonomous Navigation systems",
    "Multi-sensor fusion combining camera data with LiDAR",
    "Edge Computing for on-board processing",
    "Artificial Intelligence integration"
  ],
  features: [
    "Real-time obstacle detection and avoidance in complex environments",
    "Autonomous point-to-point navigation with 85% accuracy",
    "Machine learning-based decision making for optimal path selection",
    "Efficient path planning with dynamic adjustment capabilities",
    "Adaptive learning system that optimizes performance through experience",
    "Data analytics with on-board computing for real-time insights",
    "Self-improving system that adapts to new environments and obstacles"
  ],
  implementation: {
    phases: [
      {
        name: "Planning & Research",
        activities: ["Literature review", "Requirements analysis", "Hardware component selection", "System architecture design"]
      },
      {
        name: "Hardware Assembly",
        activities: ["Drone frame construction", "Component integration", "Sensor integration", "Processing unit installation"]
      },
      {
        name: "AI Model Training",
        activities: ["Dataset preparation", "Model architecture design", "Training implementation", "Hyperparameter optimization"]
      },
      {
        name: "Performance Analysis",
        activities: ["Accuracy measurement", "Reliability testing", "Processing latency measurement", "Power consumption analysis"]
      },
      {
        name: "Field Testing",
        activities: ["Controlled environment testing", "Real-world environment testing", "Parameter tuning", "System reliability assessment"]
      },
      {
        name: "Final Integration",
        activities: ["System optimization", "Final adjustments", "Documentation preparation", "Final presentation preparation"]
      }
    ]
  },
  contactInfo: {
    email: "contact@dronenav.edu",
    phone: "+92 300 1234567",
    location: "Engineering Department, University Campus, City"
  }
};

// Function to generate chat responses using Gemini 1.5 Flash
async function generateChatResponse(userMessage) {
  try {
    console.log('Received message:', userMessage);
    console.log('Using API key:', apiKey ? 'API key is defined' : 'API key is NOT defined');
    
    // Format project info as a comprehensive text prompt
    const projectInfoText = `
      Project Name: ${projectInfo.name}
      Description: ${projectInfo.description}
      
      Project Overview:
      ${projectInfo.overview?.tagline ? `Tagline: ${projectInfo.overview.tagline}` : ''}
      ${projectInfo.overview?.summary ? `Summary: ${projectInfo.overview.summary}` : ''}
      ${projectInfo.overview?.academicInfo ? `Academic Info: ${projectInfo.overview.academicInfo}` : ''}
      ${projectInfo.overview?.department ? `Department: ${projectInfo.overview.department}` : ''}
      ${projectInfo.overview?.achievement ? `Achievement: ${projectInfo.overview.achievement}` : ''}
      
      Team Members:
      ${projectInfo.team.map(member => `- ${member.name}: ${member.role || ''} ${member.responsibilities ? `(${member.responsibilities})` : ''} ${member.bio ? `- ${member.bio}` : ''}`).join('\n      ')}
      
      Project Supervisor: 
      - Name: ${projectInfo.supervisor.name}
      - Role: ${projectInfo.supervisor.role}
      ${projectInfo.supervisor.department ? `- Department: ${projectInfo.supervisor.department}` : ''}
      - Remarks: ${projectInfo.supervisor.remarks}
      
      Technologies Used:
      ${projectInfo.technologies.map(tech => `- ${tech}`).join('\n      ')}
      
      Key Features:
      ${projectInfo.features.map(feature => `- ${feature}`).join('\n      ')}
      
      Implementation Process:
      ${projectInfo.implementation?.phases ? projectInfo.implementation.phases.map(phase => 
        `- ${phase.name}: ${phase.activities.join(', ')}`
      ).join('\n      ') : ''}
      
      Contact Information:
      ${projectInfo.contactInfo?.email ? `- Email: ${projectInfo.contactInfo.email}` : ''}
      ${projectInfo.contactInfo?.phone ? `- Phone: ${projectInfo.contactInfo.phone}` : ''}
      ${projectInfo.contactInfo?.location ? `- Location: ${projectInfo.contactInfo.location}` : ''}
    `;
    
    // Initialize Gemini 1.5 Flash model
    console.log('Initializing Gemini 1.5 Flash model...');
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1000,
      }
    });
    
    // Create a prompt with project information and user message
    const prompt = `You are DroneNav Assistant, an AI chatbot for the DroneNav autonomous drone project. You should be helpful, friendly, and knowledgeable about the project.

Here's information about the project:
${projectInfoText}

User message: ${userMessage}

Provide a concise, helpful response:`;
    
    console.log('Sending request to Gemini 1.5 Flash model...');
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log('Received response from Gemini 1.5 Flash model');
    
    return response.text();
  } catch (error) {
    console.error("Error generating chat response:", error);
    
    // Fallback responses if the API fails
    const localResponses = {
      'team': 'Our team consists of four talented members: Moin (Team Lead & Researcher) who manages the project and directs research, Asad (Computer Vision & Embedded Engineer) who develops vision algorithms and handles embedded integration, Asim (Hardware Engineer) who assembles drone hardware and integrates sensors, and Usama (Power System Engineer) who manages power systems and battery optimization. Together, they form a diverse team of engineers from the Class of 2025.',
      'project': 'DroneNav is a university final year project developing a point-to-point autonomous drone system with real-time obstacle detection and avoidance capabilities in complex environments. The project has achieved 85% accuracy in navigating between points while avoiding obstacles in various environmental conditions. It combines advanced computer vision techniques with sophisticated control algorithms to create a reliable and efficient navigation solution.',
      'technologies': 'We use several cutting-edge technologies including: Computer Vision with YOLOv8 object detection, Custom CNN models for obstacle detection, Machine Learning for environmental adaptation, Advanced Path Planning algorithms, Autonomous Navigation systems, Multi-sensor fusion combining camera data with LiDAR, Edge Computing for on-board processing, and Artificial Intelligence integration.',
      'features': 'Key features include: Real-time obstacle detection and avoidance in complex environments, Autonomous point-to-point navigation with 85% accuracy, Machine learning-based decision making for optimal path selection, Efficient path planning with dynamic adjustment capabilities, Adaptive learning system that optimizes performance through experience, Data analytics with on-board computing for real-time insights, and a Self-improving system that adapts to new environments and obstacles.',
      'implementation': 'Our implementation followed a structured approach: 1) Planning & Research with literature review and system architecture design, 2) Hardware Assembly including drone frame construction and sensor integration, 3) AI Model Training with dataset preparation and hyperparameter optimization, 4) Performance Analysis measuring accuracy and power consumption, 5) Field Testing in both controlled and real-world environments, and finally 6) Final Integration with system optimization and documentation preparation.',
      'supervisor': 'Our project is supervised by Lec. Abdul Basit Taj from the Engineering Department. He has guided the team through the innovation process and provided critical insights on autonomous systems design.',
      'achievement': 'We successfully implemented a drone system capable of navigating between points with 85% accuracy while avoiding obstacles in various environmental conditions. Our system combines advanced computer vision with real-time decision making to create a reliable autonomous navigation solution.',
      'hello': 'Hello! I\'m DroneNav Assistant. How can I help you learn about our autonomous drone navigation project today?',
      'hi': 'Hi there! I\'m DroneNav Assistant. Feel free to ask me about our team, technologies, features, implementation process, or achievements of our drone project!',
      'default': 'I\'m DroneNav Assistant, here to provide information about our autonomous drone navigation project. You can ask me about our team members, the technologies we use, implementation process, achievements, or the key features of our system.'
    };
    
    // Check for keywords in the message and return a local response if possible
    const messageLower = userMessage.toLowerCase();
    if (messageLower.includes('team') || messageLower.includes('members') || messageLower.includes('who') || messageLower.includes('engineers')) {
      return localResponses.team;
    } else if ((messageLower.includes('project') || messageLower.includes('what') || messageLower.includes('about') || messageLower.includes('dronenav')) && 
              !messageLower.includes('supervisor') && !messageLower.includes('achievement') && !messageLower.includes('implementation')) {
      return localResponses.project;
    } else if (messageLower.includes('tech') || messageLower.includes('technology') || messageLower.includes('technologies') || messageLower.includes('stack')) {
      return localResponses.technologies;
    } else if (messageLower.includes('features') || messageLower.includes('capabilities') || messageLower.includes('can') || messageLower.includes('functions')) {
      return localResponses.features;
    } else if (messageLower.includes('implement') || messageLower.includes('development') || messageLower.includes('process') || messageLower.includes('phases') || messageLower.includes('timeline')) {
      return localResponses.implementation;
    } else if (messageLower.includes('achievement') || messageLower.includes('success') || messageLower.includes('accuracy') || messageLower.includes('accomplishment')) {
      return localResponses.achievement;
    } else if (messageLower.includes('supervisor') || messageLower.includes('professor') || messageLower.includes('teacher') || messageLower.includes('basit') || messageLower.includes('taj')) {
      return localResponses.supervisor;
    } else if (messageLower.includes('hello') || messageLower === 'hello') {
      return localResponses.hello;
    } else if (messageLower.includes('hi') || messageLower === 'hi') {
      return localResponses.hi;
    }
    
    return localResponses.default;
  }
}

module.exports = { generateChatResponse };
