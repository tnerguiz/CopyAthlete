import Link from 'next/link';

export default function Features() {
  return (
    <div>
      {/* Features Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">CopyAthlete Features</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Powerful tools to analyze and improve your athletic technique through 
            direct comparison with world-class athletes.
          </p>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Side-by-Side Comparison */}
            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-blue-100 rounded-full p-4 mb-6 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Side-by-Side Video Comparison</h3>
                <p className="text-gray-600 mb-4">
                  Compare your technique directly with professional athletes in a synchronized, 
                  side-by-side view for immediate visual feedback. Videos play simultaneously 
                  so you can see exactly how your movements differ from the pros.
                </p>
                <div className="bg-gray-200 h-48 w-full rounded-lg"></div> {/* Placeholder for feature image */}
              </div>
            </div>

            {/* Frame-by-Frame Navigation */}
            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-blue-100 rounded-full p-4 mb-6 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Frame-by-Frame Navigation</h3>
                <p className="text-gray-600 mb-4">
                  Navigate videos frame-by-frame to analyze specific moments in the movement 
                  and identify subtle technique differences. Perfect for analyzing critical 
                  phases of athletic movements with precision.
                </p>
                <div className="bg-gray-200 h-48 w-full rounded-lg"></div> {/* Placeholder for feature image */}
              </div>
            </div>

            {/* Joint Tracking */}
            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-blue-100 rounded-full p-4 mb-6 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Joint Tracking</h3>
                <p className="text-gray-600 mb-4">
                  Automatically track key body joints to visualize movement patterns and 
                  identify areas for improvement in your technique. The tracking focuses on 
                  the most important joints for athletic performance analysis.
                </p>
                <div className="bg-gray-200 h-48 w-full rounded-lg"></div> {/* Placeholder for feature image */}
              </div>
            </div>

            {/* Video Speed Control */}
            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-blue-100 rounded-full p-4 mb-6 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Video Speed Control</h3>
                <p className="text-gray-600 mb-4">
                  Adjust playback speed (0.25x, 0.5x, 0.75x, or 1.0x) to analyze movements 
                  in slow motion. This allows you to see details that would be missed at 
                  normal speed and better understand complex movements.
                </p>
                <div className="bg-gray-200 h-48 w-full rounded-lg"></div> {/* Placeholder for feature image */}
              </div>
            </div>

            {/* Video Flipping */}
            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-blue-100 rounded-full p-4 mb-6 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Video Flipping</h3>
                <p className="text-gray-600 mb-4">
                  Flip videos horizontally to compare techniques when athletes are facing 
                  different directions. This ensures you can always make direct comparisons 
                  regardless of camera angle or athlete orientation.
                </p>
                <div className="bg-gray-200 h-48 w-full rounded-lg"></div> {/* Placeholder for feature image */}
              </div>
            </div>

            {/* Video Recording */}
            <div className="flex flex-col md:flex-row items-start">
              <div className="bg-blue-100 rounded-full p-4 mb-6 md:mb-0 md:mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Built-in Video Recording</h3>
                <p className="text-gray-600 mb-4">
                  Record videos directly within the app using your device's camera. 
                  No need for external recording apps or file transfers - capture your 
                  technique and immediately compare it with the pros.
                </p>
                <div className="bg-gray-200 h-48 w-full rounded-lg"></div> {/* Placeholder for feature image */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">System Requirements</h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-blue-600 text-white">
              <h3 className="text-xl font-bold">Windows</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Windows 10 or later</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>4GB RAM minimum (8GB recommended)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>2GB free disk space</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Webcam for recording (optional)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Internet connection for initial download</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Improve Your Technique?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Get CopyAthlete today and start comparing your technique with world-class athletes.
          </p>
          <Link href="/pricing" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg inline-block">
            Get The App Now
          </Link>
        </div>
      </section>
    </div>
  );
}
