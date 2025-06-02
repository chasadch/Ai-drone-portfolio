const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize the Google Generative AI with your API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is not defined in .env file');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Project information to provide context to the AI - extracted from website content
const projectInfo = {
  name: "DroneNav - Autonomous Drone Navigation System",
  description: "A university final year project developing a point-to-point autonomous drone system with real-time obstacle detection and avoidance capabilities in complex environments",
  overview: {
    tagline: "AUTONOMOUS NAVIGATION WITH OBSTACLE AVOIDANCE",
    summary: "This final year university project focuses on developing an autonomous drone navigation system that can navigate from point to point while avoiding obstacles in real-time. The system combines advanced computer vision techniques with sophisticated control algorithms to create a reliable and efficient navigation solution.",
    academicInfo: "Final Year Project at National University of Engineering and Technology, Islamabad (NUTech)",
    department: "Electrical Engineering Department",
    achievement: "The system has achieved high accuracy in navigating between points while avoiding obstacles in various environmental conditions"
  },
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
    "YOLOv12 for object detection and tracking",
    "Custom CNN models for obstacle detection",
    "Pixhawk flight controller for navigation",
    "ROS (Robot Operating System) for system integration",
    "Python for algorithm implementation",
    "Linux/Ubuntu 20.04 operating system",
    "Jetson Nano for edge computing",
    "Sensor fusion combining camera data with LiDAR",
    "Autonomous Navigation algorithms",
    "Path Planning optimization",
    "Machine Learning for environmental adaptation",
    "Computer Vision techniques",
    "Gemini AI for interactive chatbot assistance"
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
        name: "Research & Planning",
        activities: ["Literature review of navigation algorithms", "Hardware component selection", "System architecture design"],
        description: "Our implementation began with extensive research into autonomous navigation systems and obstacle avoidance algorithms. We analyzed existing solutions and identified the key components needed for our system."
      },
      {
        name: "Hardware Assembly",
        activities: ["Drone frame construction", "Sensor integration", "Processing unit installation"],
        description: "We assembled the drone platform with carefully selected components to support our navigation system requirements. This included mounting sensors, cameras, and processing units."
      },
      {
        name: "AI Model Training",
        activities: ["Dataset preparation and annotation", "Neural network architecture design", "Hyperparameter optimization"],
        description: "We trained our object detection model using YOLOv12 architecture combined with CNN for obstacle detection on a custom dataset of navigation scenarios. The training process involved multiple iterations to achieve optimal performance."
      },
      {
        name: "Performance Analysis",
        activities: ["Precision and recall evaluation", "Processing latency measurement", "Power consumption analysis"],
        description: "We conducted comprehensive performance analysis of our trained model, evaluating metrics such as detection accuracy, processing speed, and resource utilization on the drone's hardware."
      },
      {
        name: "Field Testing",
        activities: ["Indoor controlled environment testing", "Outdoor obstacle course navigation", "System reliability assessment"],
        description: "We conducted extensive field tests in various environments to validate our system's performance in real-world conditions. This included both controlled and uncontrolled testing scenarios."
      },
      {
        name: "Final Integration",
        activities: ["System integration and optimization", "Documentation preparation", "Final presentation preparation"],
        description: "The final phase involved integrating all components into a cohesive system, fine-tuning parameters, and preparing comprehensive documentation for our university project submission."
      }
    ]
  },
  contactInfo: {
    email: "asadarshadf21@nutech.edu.pk",
    phone: "+92 3041192980",
    location: "Electrical Engineering Department, National University of Engineering and Technology, Islamabad (NUTech)"
  }
};

// Function to generate chat responses using Gemini 1.5 Flash
async function generateChatResponse(userMessage) {
  try {
    console.log('Received message:', userMessage);
    console.log('Using API key:', apiKey ? 'API key is defined' : 'API key is NOT defined');
    
    // Format implementation phases with detailed descriptions
    const phasesDescription = projectInfo.implementation.phases.map(phase => {
      return `- ${phase.name}: ${phase.description}\n  Activities: ${phase.activities.join(', ')}`;
    }).join('\n');
    
    // Format project info as a comprehensive text prompt with improved structure
    const projectInfoText = `
      PROJECT DETAILS:
      Project Name: ${projectInfo.name}
      Description: ${projectInfo.description}
      
      PROJECT OVERVIEW:
      Tagline: ${projectInfo.overview.tagline}
      Summary: ${projectInfo.overview.summary}
      Academic Context: ${projectInfo.overview.academicInfo}
      Department: ${projectInfo.overview.department}
      Achievement: ${projectInfo.overview.achievement}
      
      TEAM MEMBERS:
      ${projectInfo.team.map(member => {
        return `- ${member.name}: ${member.role || 'Team Member'} \n  ${member.responsibilities ? `Responsibilities: ${member.responsibilities}` : ''} \n  ${member.bio ? `Bio: ${member.bio}` : ''}`;
      }).join('\n\n      ')}
      
      PROJECT SUPERVISOR: 
      Name: ${projectInfo.supervisor.name}
      Role: ${projectInfo.supervisor.role}
      Department: ${projectInfo.supervisor.department}
      Remarks: ${projectInfo.supervisor.remarks}
      
      TECHNOLOGIES USED:
      ${projectInfo.technologies.map(tech => `- ${tech}`).join('\n      ')}
      
      KEY FEATURES:
      ${projectInfo.features.map(feature => `- ${feature}`).join('\n      ')}
      
      IMPLEMENTATION PROCESS:
      ${phasesDescription}
      
      CONTACT INFORMATION:
      Email: ${projectInfo.contactInfo.email}
      Phone: ${projectInfo.contactInfo.phone}
      Location: ${projectInfo.contactInfo.location}
    `;
    
    // Initialize Gemini 1.5 Flash model with improved parameters
    console.log('Initializing Gemini 1.5 Flash model...');
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1200, // Increased token limit for more detailed responses
      }
    });
    
    // Create a more detailed prompt with project information and user message
    const prompt = `You are DroneNav Assistant, an AI chatbot for the DroneNav autonomous drone navigation project at the National University of Engineering and Technology, Islamabad (NUTech). 

You have access to comprehensive project information and should respond with accurate, specific details. Be helpful, friendly, knowledgeable, and concise. Prefer specific technical details over general statements when possible.

When asked about technologies, mention the specific tools used like YOLOv12, Pixhawk, ROS, etc. If asked about team members, provide their specific roles and responsibilities. When discussing implementation, reference the specific phases and activities.

Here's the complete information about the project:
${projectInfoText}

User message: ${userMessage}

Provide a helpful, accurate response using the project information above:`;
    
    console.log('Sending request to Gemini 1.5 Flash model...');
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log('Received response from Gemini 1.5 Flash model');
    
    return response.text();
  } catch (error) {
    console.error("Error generating chat response:", error);
    
    // Comprehensive fallback responses if the API fails
    const localResponses = {
      'team': 'Our project team consists of four talented members from the Electrical Engineering Department at NUTech: Moin (Team Lead & Researcher) who manages the project and directs research efforts, focusing on system architecture and integration; Asad (Computer Vision & Embedded Engineer) who develops vision algorithms, implements object detection models, and handles embedded integration; Asim (Hardware Engineer) who assembles drone hardware, integrates sensors, and tests power systems; and Usama (Power System Engineer) who manages power systems, battery optimization, and conducts field tests. The team is supervised by Lec. Abdul Basit Taj who provides guidance on autonomous systems design.',
      
      'project': 'DroneNav is a final year project at the National University of Engineering and Technology, Islamabad (NUTech) developing a point-to-point autonomous drone system with real-time obstacle detection and avoidance capabilities in complex environments. The system has achieved 85% accuracy in navigating between points while avoiding obstacles in various environmental conditions. It combines advanced computer vision techniques with sophisticated control algorithms to create a reliable and efficient navigation solution that can be applied in various sectors like surveillance, search and rescue, and logistics.',
      
      'technologies': 'Our project utilizes several cutting-edge technologies including: YOLOv12 for object detection and tracking, Custom CNN models for obstacle detection, Pixhawk flight controller for navigation, ROS (Robot Operating System) for system integration, Python for algorithm implementation, Linux/Ubuntu 20.04 operating system, Jetson Nano for edge computing, Sensor fusion combining camera data with LiDAR, Path Planning optimization algorithms, and Machine Learning for environmental adaptation. We also integrated Gemini AI for our interactive chatbot assistant.',
      
      'features': 'Key features of our drone system include: Real-time obstacle detection and avoidance in complex environments, Autonomous point-to-point navigation with 85% accuracy, Machine learning-based decision making for optimal path selection, Efficient path planning with dynamic adjustment capabilities, Adaptive learning system that optimizes performance through experience, Data analytics with on-board computing for real-time insights, and a Self-improving system that adapts to new environments and obstacles. Our system prioritizes reliability and performance in varying conditions.',
      
      'implementation': 'Our implementation followed six structured phases: 1) Research & Planning - extensive research into autonomous navigation systems and obstacle avoidance algorithms, analyzing existing solutions; 2) Hardware Assembly - assembling the drone platform with sensors, cameras, and processing units; 3) AI Model Training - training our object detection model using YOLOv12 architecture with CNN on a custom dataset; 4) Performance Analysis - comprehensive evaluation of detection accuracy, processing speed, and resource utilization; 5) Field Testing - extensive tests in various environments including indoor controlled spaces and outdoor obstacle courses; and 6) Final Integration - integrating all components into a cohesive system with documentation.',
      
      'supervisor': 'Our project is supervised by Lec. Abdul Basit Taj from the Electrical Engineering Department at NUTech. He has guided the team through the innovation process and provided critical insights on autonomous systems design, helping us overcome technical challenges and optimize our approach to navigation and obstacle avoidance.',
      
      'achievement': 'We successfully implemented a drone system capable of navigating between points with 85% accuracy while avoiding obstacles in various environmental conditions. Our system combines advanced computer vision with real-time decision making to create a reliable autonomous navigation solution. The project received recognition for its innovative approach to drone autonomy and practical applications in real-world scenarios.',
      
      'contact': 'For more information about our project, you can reach out to us at asadarshadf21@nutech.edu.pk or call +92 3041192980. We are based at the Electrical Engineering Department, National University of Engineering and Technology, Islamabad (NUTech).',
      
      'academic': 'This project is a final year initiative at the National University of Engineering and Technology, Islamabad (NUTech) within the Electrical Engineering Department. The work represents the culmination of our undergraduate studies and demonstrates practical application of electrical engineering and computer science principles in autonomous systems.',
      
      'hello': 'Hello! I\'m DroneNav Assistant. How can I help you learn about our autonomous drone navigation project today? Feel free to ask about our team, technologies, implementation process, or specific features.',
      
      'hi': 'Hi there! I\'m DroneNav Assistant for the autonomous drone navigation project at NUTech. I can provide information about our team members, the technologies we use like YOLOv12 and ROS, our implementation process, or the key features of our system. What would you like to know?',
      
      'default': 'I\'m DroneNav Assistant, here to provide detailed information about our autonomous drone navigation project at the National University of Engineering and Technology. You can ask me about our team members, the technologies we use (like YOLOv12, Pixhawk, ROS), our implementation process across the six development phases, achievements, or the key features of our system.'
    };
    
    // Enhanced keyword matching system for more accurate fallback responses
    const messageLower = userMessage.toLowerCase();
    
    // Team member information queries
    if (messageLower.includes('team') || messageLower.includes('members') || messageLower.includes('who') || 
        messageLower.includes('engineers') || messageLower.includes('students') || messageLower.includes('developers') || 
        messageLower.includes('creators') || messageLower.includes('made') || messageLower.includes('built') || 
        (messageLower.includes('people') && messageLower.includes('behind')) || 
        messageLower.includes('moin') || messageLower.includes('asad') || messageLower.includes('asim') || messageLower.includes('usama')) {
      return localResponses.team;
    } 
    
    // Project overview queries
    else if (((messageLower.includes('project') || messageLower.includes('what') || messageLower.includes('about') || 
             messageLower.includes('dronenav') || messageLower.includes('tell me about') || 
             messageLower.includes('overview') || messageLower.includes('summary') || messageLower.includes('describe')) && 
             !messageLower.includes('supervisor') && !messageLower.includes('achievement') && 
             !messageLower.includes('implementation') && !messageLower.includes('technologies')) || 
             messageLower === 'what is this project about?' || messageLower === 'what is dronenav?') {
      return localResponses.project;
    } 
    
    // Technology queries
    else if (messageLower.includes('tech') || messageLower.includes('technology') || messageLower.includes('technologies') || 
             messageLower.includes('stack') || messageLower.includes('programming') || messageLower.includes('language') || 
             messageLower.includes('framework') || messageLower.includes('libraries') || messageLower.includes('tools') || 
             messageLower.includes('software') || messageLower.includes('hardware') || messageLower.includes('yolo') || 
             messageLower.includes('cnn') || messageLower.includes('ros') || messageLower.includes('python') || 
             messageLower.includes('jetson') || messageLower.includes('how was it built') || messageLower.includes('pixhawk')) {
      return localResponses.technologies;
    } 
    
    // Feature queries
    else if (messageLower.includes('features') || messageLower.includes('capabilities') || messageLower.includes('can') || 
             messageLower.includes('functions') || messageLower.includes('what does it do') || messageLower.includes('how does it work') || 
             messageLower.includes('functionality') || messageLower.includes('ability') || messageLower.includes('performance') || 
             messageLower.includes('navigation') || messageLower.includes('detection') || messageLower.includes('obstacle') || 
             messageLower.includes('avoidance') || messageLower.includes('autonomous') || messageLower.includes('drone capabilities')) {
      return localResponses.features;
    } 
    
    // Implementation process queries
    else if (messageLower.includes('implement') || messageLower.includes('development') || messageLower.includes('process') || 
             messageLower.includes('phases') || messageLower.includes('timeline') || messageLower.includes('steps') || 
             messageLower.includes('stages') || messageLower.includes('methodology') || messageLower.includes('approach') || 
             messageLower.includes('how was it implemented') || messageLower.includes('how did you build') || 
             messageLower.includes('development process') || messageLower.includes('research') || messageLower.includes('assembly') || 
             messageLower.includes('training') || messageLower.includes('testing') || messageLower.includes('integration')) {
      return localResponses.implementation;
    } 
    
    // Achievement queries
    else if (messageLower.includes('achievement') || messageLower.includes('success') || messageLower.includes('accuracy') || 
             messageLower.includes('accomplishment') || messageLower.includes('result') || messageLower.includes('outcome') || 
             messageLower.includes('how well') || messageLower.includes('how good') || messageLower.includes('how accurate') || 
             messageLower.includes('performance metric') || messageLower.includes('successful') || 
             messageLower.includes('precision') || messageLower.includes('reliability')) {
      return localResponses.achievement;
    } 
    
    // Supervisor queries
    else if (messageLower.includes('supervisor') || messageLower.includes('professor') || messageLower.includes('teacher') || 
             messageLower.includes('basit') || messageLower.includes('taj') || messageLower.includes('lecturer') || 
             messageLower.includes('advisor') || messageLower.includes('guide') || messageLower.includes('mentor') || 
             messageLower.includes('faculty') || messageLower.includes('who supervised')) {
      return localResponses.supervisor;
    } 
    
    // Contact information queries
    else if (messageLower.includes('contact') || messageLower.includes('email') || messageLower.includes('phone') || 
             messageLower.includes('reach') || messageLower.includes('get in touch') || messageLower.includes('location') || 
             messageLower.includes('address') || messageLower.includes('department') || messageLower.includes('university')) {
      return localResponses.contact;
    } 
    
    // Academic information queries
    else if (messageLower.includes('academic') || messageLower.includes('university') || messageLower.includes('nutech') || 
             messageLower.includes('school') || messageLower.includes('college') || messageLower.includes('department') || 
             messageLower.includes('electrical') || messageLower.includes('engineering') || 
             messageLower.includes('final year') || messageLower.includes('undergraduate')) {
      return localResponses.academic;
    } 
    
    // Greeting responses
    else if (messageLower.includes('hello') || messageLower === 'hello') {
      return localResponses.hello;
    } 
    
    else if (messageLower.includes('hi') || messageLower === 'hi' || messageLower === 'hey' || messageLower === 'hiya') {
      return localResponses.hi;
    }
    
    return localResponses.default;
  }
}

module.exports = { generateChatResponse };
