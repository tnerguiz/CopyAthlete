import Link from 'next/link';

export default function Showcase() {
  return (
    <div>
      {/* Showcase Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Technique Showcase</h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            See real examples of athletes improving their technique by comparing with world-class performers.
          </p>
        </div>
      </section>

      {/* Coach Spotlight */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Featured Coach</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-300 h-80 w-full"></div> {/* Placeholder for coach image */}
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-10">
              <h3 className="text-3xl font-bold mb-4">Paul Chelimo</h3>
              <p className="text-xl text-gray-700 mb-4">Olympic Silver Medalist</p>
              <p className="text-gray-700 mb-6">
                Paul Chelimo is an Olympic silver medalist and American record holder in the 5000m. 
                Born in Kenya, he moved to the United States to attend college and later joined the U.S. Army, 
                becoming a U.S. citizen in 2014.
              </p>
              <p className="text-gray-700 mb-6">
                Paul's running technique is characterized by:
              </p>
              <ul className="list-disc pl-5 mb-8 text-gray-700 space-y-2">
                <li>Efficient arm movement that balances his stride</li>
                <li>Powerful hip extension for maximum propulsion</li>
                <li>Optimal foot strike for energy conservation</li>
                <li>Relaxed upper body posture even during intense efforts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">Success Stories</h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Real athletes who improved their performance using CopyAthlete's analysis tools.
          </p>
          
          {/* Success Story 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">High School Runner: Michael T.</h3>
              <p className="text-gray-600 mb-6">
                Michael improved his 5K time by 45 seconds after correcting his running form.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Before</h4>
                  <div className="bg-gray-200 h-64 w-full rounded"></div> {/* Placeholder for before video */}
                  <ul className="mt-4 text-gray-600 space-y-1">
                    <li>• Excessive vertical movement</li>
                    <li>• Inefficient arm swing</li>
                    <li>• Heel striking causing braking force</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">After</h4>
                  <div className="bg-gray-200 h-64 w-full rounded"></div> {/* Placeholder for after video */}
                  <ul className="mt-4 text-gray-600 space-y-1">
                    <li>• Reduced bouncing for better efficiency</li>
                    <li>• Compact arm movement</li>
                    <li>• Midfoot strike for better propulsion</li>
                  </ul>
                </div>
              </div>
              
              <div className="italic text-gray-600">
                "Comparing my form with Paul Chelimo's was eye-opening. I could immediately see what I was doing wrong and how to fix it. The frame-by-frame analysis made it easy to understand the changes I needed to make."
              </div>
            </div>
          </div>
          
          {/* Success Story 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Adult Recreational Runner: Sarah K.</h3>
              <p className="text-gray-600 mb-6">
                Sarah eliminated her recurring knee pain by correcting her running technique.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Before</h4>
                  <div className="bg-gray-200 h-64 w-full rounded"></div> {/* Placeholder for before video */}
                  <ul className="mt-4 text-gray-600 space-y-1">
                    <li>• Overstriding causing knee stress</li>
                    <li>• Poor posture with forward lean</li>
                    <li>• Inconsistent cadence</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">After</h4>
                  <div className="bg-gray-200 h-64 w-full rounded"></div> {/* Placeholder for after video */}
                  <ul className="mt-4 text-gray-600 space-y-1">
                    <li>• Shorter stride with foot landing under body</li>
                    <li>• Upright posture with proper alignment</li>
                    <li>• Higher, more consistent cadence</li>
                  </ul>
                </div>
              </div>
              
              <div className="italic text-gray-600">
                "The joint tracking feature was incredibly helpful in showing me how my knee was moving compared to Paul's. After making the adjustments, I can now run pain-free for the first time in years."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Success Stories</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Get CopyAthlete today and start your journey to improved technique and better performance.
          </p>
          <Link href="/pricing" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg inline-block">
            Get The App Now
          </Link>
        </div>
      </section>
    </div>
  );
}
