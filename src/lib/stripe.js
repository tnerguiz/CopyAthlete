// This file contains the Stripe API configuration and helper functions

import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
// In a real implementation, this would be stored in an environment variable
const stripePublishableKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

// Initialize Stripe
export const getStripe = async () => {
  const stripePromise = loadStripe(stripePublishableKey);
  return stripePromise;
};

// Calculate price based on selected devices
export const calculatePrice = (devices) => {
  let totalPrice = 0;
  
  // Price for each device type
  const prices = {
    windows: 29.99,
    mac: 29.99,
    android: 19.99,
    ios: 19.99
  };
  
  // Check if Windows is selected
  const hasWindows = devices.includes('windows');

  // If Windows is selected, only charge for Windows
  if (hasWindows) {
    totalPrice = prices.windows;
    // Mobile devices are free with Windows, so don't add their price
  } else {
    // No Windows selected, charge for each device
    devices.forEach(device => {
      if (prices[device]) {
        totalPrice += prices[device];
      }
    });
  }

  return totalPrice;
};


// Format price for display
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Create a payment session
export const createCheckoutSession = async (devices, coachId) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devices,
        coachId
      }),
    });
    
    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Track coach revenue
export const trackCoachRevenue = async (coachId, amount) => {
  try {
    const response = await fetch('/api/track-coach-revenue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coachId,
        amount
      }),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error tracking coach revenue:', error);
    throw error;
  }
};
