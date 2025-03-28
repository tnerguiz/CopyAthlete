import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
// In a real implementation, this would be stored in an environment variable
const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

export async function POST(request: NextRequest) {
  try {
    const { devices, coachId } = await request.json();
    
    // Calculate price based on selected devices
    let totalAmount = 0;
    const prices = {
      windows: 2999, // in cents
      mac: 2999,
      android: 1999,
      ios: 1999
    };
    
    // Check if Windows is selected
    const hasWindows = devices.includes('windows');
    
    // Create line items for Stripe
    let lineItems = [];
    
    if (hasWindows) {
      // If Windows is selected, only charge for Windows
      totalAmount = prices.windows;
      
      // Add Windows as a paid item
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'CopyAthlete for Windows',
            description: 'License for Windows device with one free mobile device'
          },
          unit_amount: prices.windows,
        },
        quantity: 1,
      });
      
      // Check if a mobile device is selected (Android or iOS)
      const mobileDevices = devices.filter(device => device === 'android' || device === 'ios');
      
      // If a mobile device is selected, add it as a free item
      if (mobileDevices.length > 0) {
        const mobileDevice = mobileDevices[0]; // Take the first one if multiple are selected
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: `CopyAthlete for ${mobileDevice.charAt(0).toUpperCase() + mobileDevice.slice(1)}`,
              description: `Free license for ${mobileDevice.charAt(0).toUpperCase() + mobileDevice.slice(1)} device (included with Windows purchase)`
            },
            unit_amount: 0, // Free
          },
          quantity: 1,
        });
      }
    } else {
      // No Windows selected, charge for each device
      devices.forEach(device => {
        if (prices[device]) {
          totalAmount += prices[device];
          
          lineItems.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: `CopyAthlete for ${device.charAt(0).toUpperCase() + device.slice(1)}`,
                description: `License for ${device.charAt(0).toUpperCase() + device.slice(1)} device`
              },
              unit_amount: prices[device],
            },
            quantity: 1,
          });
        }
      });
    }
    
    // Add coach information as metadata
    const metadata = {
      coachId: coachId,
      devices: devices.join(',')
    };
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      metadata: metadata,
    });
    
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
