import React from 'react'

export default function MortgageCalc() {
  return (
    <div className='flex flex-col md:flex-row md:gap-8'>

        {/* Left Column */}

        <div className="flex-1 mb-6 md:mb-0">
            {/* Home Price Amount */}
            <div className="flex flex-col space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Home Price</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                        <input
                        type="number"
                        defaultValue="300000"
                        className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="300,000"
                        />
                    </div>
                <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="10000"
                    defaultValue="300000"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#238dc1]"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>$50k</span>
                    <span>$1M</span>
                </div>
            </div>

            {/* Down Payment */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Down Payment</label>
                <button
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  Switch to Percentage
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  defaultValue="60000"
                  className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="60,000"
                />
              </div>
              <input
                type="range"
                min="0"
                max="300000"
                step="5000"
                defaultValue="60000"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#238dc1]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>$300k</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className='flex flex-col space-y-2'>
                <label className="block text-sm font-medium text-gray-700">Interest Rate</label>
                <div className="relative">
                    <input
                    type="number"
                    defaultValue="4.5"
                    className="w-full py-3 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="4.5"
                    step="0.125"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
                </div>
                <input
                type="range"
                min="2"
                max="8"
                step="0.125"
                defaultValue="4.5"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#238dc1]"
                />
                <div className="flex justify-between text-xs text-gray-500">
                <span>2%</span>
                <span>8%</span>
              </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <div className="flex flex-col space-y-6">
            {/* Loan Term */}
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Loan Term</label>
              <div className="flex space-x-4">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    className={`flex-1 py-3 rounded-lg border ${
                      term === 30
                        ? 'bg-[#238dc1] text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Property Tax */}
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Property Tax</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  defaultValue="3600"
                  className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3,600"
                />
              </div>
              <p className="text-xs text-gray-500">
                Estimated at 1.2% of home value
              </p>
            </div>

            {/* Insurance */}
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Homeowners Insurance</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  defaultValue="1200"
                  className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1,200"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button className="w-full mt-4 py-4 bg-[#238dc1] hover:bg-[#3ba9d4] text-white font-medium rounded-lg shadow transition-colors">
              Calculate Monthly Payment
            </button>
          </div>
        </div>
    </div>
  )
}
