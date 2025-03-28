"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStripe, calculatePrice, formatPrice, createCheckoutSession } from '@/lib/stripe';

export default function PricingPage() {
  const [selectedDevices, setSelectedDevices] = useState(['windows']);
  const [totalPrice, setTotalPrice] = useState(29.99);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update total price when selected devices change
  useEffect(() => {
    const price = calculatePrice(selectedDevices);
    setTotalPrice(price);
  }, [selectedDevices]);
  
  // Toggle device selection
const toggleDevice = (device) => {
  // Handle Windows selection
  if (device === 'windows') {
    if (selectedDevices.includes('windows')) {
      // If removing Windows, also remove any mobile devices that were included for free
      setSelectedDevices([]);
    } else {
      // If adding Windows, don't automatically add mobile devices
      // User will need to select one mobile device if desired
      setSelectedDevices(['windows']);
    }
    return;
  }

  // Handle mobile device selection
  if (['android', 'ios'].includes(device)) {
    // If Windows is selected, only allow selecting one mobile device
    if (selectedDevices.includes('windows')) {
      // If this mobile device is already selected, deselect it
      if (selectedDevices.includes(device)) {
        setSelectedDevices(['windows']);
        return;
      }

      // If another mobile device is already selected, replace it with this one
      const otherMobile = device === 'android' ? 'ios' : 'android';
      if (selectedDevices.includes(otherMobile)) {
        setSelectedDevices(['windows', device]);
      } else {
        // Add this mobile device
        setSelectedDevices(['windows', device]);
      }
    } else {
      // Windows not selected, handle normal mobile device selection
      if (selectedDevices.includes(device)) {
        setSelectedDevices(selectedDevices.filter(d => d !== device));
      } else {
        setSelectedDevices([...selectedDevices, device]);
      }
    }
  }
};

  
  // Handle checkout
  const handleCheckout = async () => {
    if (selectedDevices.length === 0) return;
    
    setIsLoading(true);
    try {
      // Create checkout session
      const session = await createCheckoutSession(selectedDevices, 'paul_chelimo');
      
      // Redirect to Stripe checkout
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
      
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      {/* Pricing Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get CopyAthlete</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Choose your devices and start improving your technique today.
          </p>
        </div>
      </section>

      {/* Sport & Coach Selection */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">1. Choose Your Sport & Coach</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Sport</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <input type="radio" id="sport-running" name="sport" className="h-5 w-5 text-blue-600" checked disabled />
                <label htmlFor="sport-running" className="text-lg">Running</label>
              </div>
              <div className="mt-4 text-gray-500 italic">
                <p>More sports coming soon!</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Coach</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <input type="radio" id="coach-paul" name="coach" className="h-5 w-5 text-blue-600" checked disabled />
                <label htmlFor="coach-paul" className="text-lg">Paul Chelimo - Olympic Silver Medalist</label>
              </div>
              <div className="mt-4 text-gray-500 italic">
                <p>More coaches coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Selection */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">2. Select Your Devices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Windows Device Selection - No changes needed except adding explanatory text */}
<div
  className={`device-selector bg-white rounded-lg shadow-md overflow-hidden border-2 p-6 cursor-pointer ${selectedDevices.includes('windows') ? 'border-blue-500' : 'border-gray-200'}`}
  onClick={() => toggleDevice('windows')}
>
  <div className="flex items-center mb-4">
    <input
      type="checkbox"
      id="device-windows"
      name="device"
      className="h-5 w-5 text-blue-600"
      checked={selectedDevices.includes('windows')}
      readOnly
    />
    <label htmlFor="device-windows" className="ml-3 text-xl font-bold">Windows</label>
    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">INCLUDES MOBILE</span>
  </div>
  <p className="text-gray-600 mb-2">Windows 10 or later</p>
  <p className="text-2xl font-bold text-blue-600">$29.99</p>
</div>

            {/* Android Device Selection - Modified to show as free with Windows */}
            <div
              className={`device-selector bg-white rounded-lg shadow-md overflow-hidden border-2 p-6 ${selectedDevices.includes('android') ? 'border-blue-500' : selectedDevices.includes('windows') ? 'border-green-200' : 'border-gray-200 opacity-50'}`}
              onClick={() => selectedDevices.includes('windows') ? null : toggleDevice('android')}
            >
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="device-android"
                  name="device"
                  className="h-5 w-5 text-blue-600"
                  checked={selectedDevices.includes('android') || selectedDevices.includes('windows')}
                  readOnly
                  disabled={selectedDevices.includes('windows')}
                />
                <label htmlFor="device-android" className="ml-3 text-xl font-bold text-gray-400">Android</label>
                {selectedDevices.includes('windows') &&
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">INCLUDED FREE</span>
                }
              </div>
              <p className="text-gray-400 mb-2">Coming soon</p>
              <p className="text-2xl font-bold text-gray-400">
                {selectedDevices.includes('windows') ? 'Included' : '$19.99'}
              </p>
            </div>

            {/* iOS Device Selection - Modified to show as free with Windows */}
            <div
              className={`device-selector bg-white rounded-lg shadow-md overflow-hidden border-2 p-6 ${selectedDevices.includes('ios') ? 'border-blue-500' : selectedDevices.includes('windows') ? 'border-green-200' : 'border-gray-200 opacity-50'}`}
              onClick={() => selectedDevices.includes('windows') ? null : toggleDevice('ios')}
            >
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="device-ios"
                  name="device"
                  className="h-5 w-5 text-blue-600"
                  checked={selectedDevices.includes('ios') || selectedDevices.includes('windows')}
                  readOnly
                  disabled={selectedDevices.includes('windows')}
                />
                <label htmlFor="device-ios" className="ml-3 text-xl font-bold text-gray-400">iPhone/iPad</label>
                {selectedDevices.includes('windows') &&
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">INCLUDED FREE</span>
                }
              </div>
              <p className="text-gray-400 mb-2">Coming soon</p>
              <p className="text-2xl font-bold text-gray-400">
                {selectedDevices.includes('windows') ? 'Included' : '$19.99'}
              </p>
            </div>
          </div>
          {/* Bundle Pricing Explanation - Add this right after the device grid */}
          {selectedDevices.includes('windows') && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                <span className="mr-2">🎁</span> Bundle Benefit Activated!
              </h3>
              <p className="text-green-700">
                Your purchase of the Windows version includes a mobile version at no extra cost! You can use it yourself or share with a friend.
              </p>
              <div className="mt-3 bg-white rounded p-3 border border-green-100">
                <h4 className="font-medium text-green-800 mb-1">What you get:</h4>
                <ul className="text-sm text-green-700">
                  <li className="flex items-center mb-1">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Full Windows version with all features
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    One mobile version (Android or iOS) at no extra cost
                  </li>
                </ul>
              </div>
            </div>
          )}


          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Total</h3>
              <p className="text-3xl font-bold text-blue-600">{formatPrice(totalPrice)}</p>
            </div>
            <p className="text-gray-600 mb-6">One-time payment, no subscription</p>
            <div className="text-center">
              <button 
                className="get-app-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg w-full md:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={isLoading || selectedDevices.length === 0}
              >
                {isLoading ? 'Processing...' : 'Purchase Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">How does the bundle pricing work?</h3>
              <p className="text-gray-600">
                When you purchase the Windows version of CopyAthlete for $29.99, you get one mobile version (Android or iOS) included at no extra
                cost! You can use both yourself or share the mobile version with a friend. This gives you more flexibility
                in how you use the app and provides better value compared to purchasing each device separately.
              </p>
            </div>
      
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Can I use the app on multiple devices?</h3>
              <p className="text-gray-600">
                Yes! With our bundle pricing, when you purchase the Windows version, you get one mobile version (Android or iOS) included at no extra
                cost. You can use both yourself or share the mobile version with a friend. If you want to use
                CopyAthlete on additional devices beyond what's included in your bundle, you'll need to purchase those separately.
              </p>
            </div>
      
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">When will other sports and coaches be available?</h3>
              <p className="text-gray-600">
                We're actively working on adding more sports and coaches. When new options become available, you'll be
                able to purchase them separately.
              </p>
            </div>
      
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">What if I need help using the app?</h3>
              <p className="text-gray-600">
                We provide comprehensive documentation with the app. If you need additional assistance, you can contact
                our support team through the Contact page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
