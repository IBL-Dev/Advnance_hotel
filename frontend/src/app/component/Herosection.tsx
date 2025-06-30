import React from 'react';

const Herosection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16  sm:px-8  bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="w-full px-0">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                HOTEL <span className="text-teal-500">FOR YOU</span>
              </h1>
              <p className="text-xl font-medium text-gray-700 mt-2">
                AND ENJOY YOUR VACATION
              </p>
            </div>

            <p className="text-gray-500 text-base leading-relaxed max-w-md mt-6">
              Lorem ipsum dolor sit amet, consectetur sed nonummy nibh euismod tincidunt dolore magna erat volutpat
              Lorem ipsum dolor sit amet, consectetur sed nonummy nibh euismod tincidunt dolore magna erat volutpat
              Lorem ipsum dolor sit amet, consectetur sed nonummy nibh euismod tincidunt dolore magna erat volutpat
            </p>

            <div className="pt-8">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Book your Room
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full px-0">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Luxury hotel room with modern furnishing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
