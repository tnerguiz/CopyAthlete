import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
// In a real implementation, this would be stored in an environment variable
const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// In a real implementation, this would use a database
// For now, we'll use a simple in-memory store
const coachRevenue = {
  // coachId: amount in cents
};

export async function POST(request: NextRequest) {
  try {
    const { coachId, amount } = await request.json();
    
    // Calculate coach's 25% share
    const coachShare = Math.round(amount * 0.25);
    
    // Update coach revenue tracking
    if (!coachRevenue[coachId]) {
      coachRevenue[coachId] = 0;
    }
    coachRevenue[coachId] += coachShare;
    
    // In a real implementation, this would be stored in a database
    console.log(`Coach ${coachId} earned $${(coachShare / 100).toFixed(2)}`);
    console.log(`Total earnings for coach ${coachId}: $${(coachRevenue[coachId] / 100).toFixed(2)}`);
    
    return NextResponse.json({ 
      success: true, 
      coachId, 
      amountAdded: coachShare,
      totalEarnings: coachRevenue[coachId]
    });
  } catch (error) {
    console.error('Error tracking coach revenue:', error);
    return NextResponse.json(
      { error: 'Error tracking coach revenue' },
      { status: 500 }
    );
  }
}
