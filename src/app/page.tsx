import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Master Athletic Technique Like The Pros</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            CopyAthlete helps you improve your performance by comparing your technique 
            with world-class athletes using advanced video analysis tools.
          </p>
          <Link href="/pricing" className="get-app-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg inline-block">
            Get The App
          </Link>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Analysis Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="feature-card bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Side-by-Side Comparison</h3>
              <p className="text-gray-600">
                Compare your technique directly with professional athletes in a synchronized, 
                side-by-side view for immediate visual feedback.
              </p>
            </div>
            
            <div className="feature-card bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Frame-by-Frame Analysis</h3>
              <p className="text-gray-600">
                Navigate videos frame-by-frame to analyze specific moments in the movement 
                and identify subtle technique differences.
              </p>
            </div>
            
            <div className="feature-card bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Joint Tracking</h3>
              <p className="text-gray-600">
                Automatically track key body joints to visualize movement patterns and 
                identify areas for improvement in your technique.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link href="/features" className="inline-block text-blue-600 font-semibold hover:text-blue-800">
              See All Features →
            </Link>
          </div>
        </div>
      </section>

      {/* Coach Spotlight */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Learn From The Best</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-300 h-80 w-full"></div> {/* Placeholder for coach image */}
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-10">
              <h3 className="text-3xl font-bold mb-4">Paul Chelimo</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Olympic silver medalist and American record holder in the 5000m. Paul's 
                running technique has been studied and admired by coaches worldwide for 
                its efficiency and power.
              </p>
              <p className="text-gray-700 mb-8">
                With CopyAthlete, you can analyze Paul's running form in detail, comparing 
                your own technique side-by-side with his world-class movement patterns.
              </p>
              <Link href="/showcase" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                View Technique Showcase
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">Real Results</h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            See how athletes have improved their technique using CopyAthlete's analysis tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Before</h3>
                <p className="text-gray-600 mb-4">
                  Initial technique with inefficient form and wasted energy.
                </p>
              </div>
              <div className="bg-gray-300 h-64 w-full"></div> {/* Placeholder for before video */}
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">After</h3>
                <p className="text-gray-600 mb-4">
                  Improved technique after analyzing and comparing with Paul Chelimo.
                </p>
              </div>
              <div className="bg-gray-300 h-64 w-full"></div> {/* Placeholder for after video */}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/showcase" className="inline-block text-blue-600 font-semibold hover:text-blue-800">
              View More Success Stories →
            </Link>
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
