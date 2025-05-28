/**
 * API Service for AI Autonomous Drone Portfolio
 * Handles communication with the Node.js backend
 */

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? `http://${window.location.hostname}:3000/api` 
  : '/api';

const ApiService = {
  /**
   * Submit contact form data to the backend
   * @param {Object} formData - Contact form data
   * @returns {Promise} - Response from the API
   */
  submitContactForm: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
  
  /**
   * Fetch drone data from the backend
   * @returns {Promise} - Drone data from the API
   */
  getDrones: async () => {
    try {
      const response = await fetch(`${API_URL}/drones`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching drone data:', error);
      throw error;
    }
  }
};

// Enhance the contact form with API submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.querySelector('.form-submit-btn');
  const formResponse = document.querySelector('.form-response');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      // Show loading state
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Gather form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
      };
      
      try {
        // Submit form data to API
        const response = await ApiService.submitContactForm(formData);
        
        // Show success message
        formResponse.innerHTML = `
          <div class="alert alert-success">
            <i class="fas fa-check-circle"></i> 
            Your message has been sent successfully! We'll get back to you soon.
          </div>
        `;
        formResponse.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Re-enable submit button
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = 'Send Message';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formResponse.style.display = 'none';
        }, 5000);
        
      } catch (error) {
        // Show error message
        formResponse.innerHTML = `
          <div class="alert alert-error">
            <i class="fas fa-exclamation-circle"></i>
            Sorry, there was an error sending your message. Please try again.
          </div>
        `;
        formResponse.style.display = 'block';
        
        // Re-enable submit button
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = 'Send Message';
      }
    });
  }
  
  // Dynamic drone data loading (if on drone specs page)
  const droneSpecsContainer = document.querySelector('.drone-specs-details');
  if (droneSpecsContainer) {
    ApiService.getDrones()
      .then(drones => {
        console.log('Drone data loaded from API:', drones);
        // We'll keep using the static HTML for now
        // This could be enhanced to dynamically render the drone specs
      })
      .catch(error => {
        console.error('Failed to load drone data, using static content instead');
      });
  }
});
