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
    
    // Add price for each selected device
    devices.forEach(device => {
      if (prices[device]) {
        totalAmount += prices[device];
      }
    });
    
    // Create line items for Stripe
    const lineItems = devices.map(device => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `CopyAthlete for ${device.charAt(0).toUpperCase() + device.slice(1)}`,
            description: `License for ${device.charAt(0).toUpperCase() + device.slice(1)} device`
          },
          unit_amount: prices[device] || 0,
        },
        quantity: 1,
      };
    });
    
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
