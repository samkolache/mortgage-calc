'use client'
import React, {useState, useEffect} from 'react'

export default function MortgageCalc() {

    const [homePrice, setHomePrice] = useState(300000);
    const [downPayment, setDownPayment] = useState(60000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [isPercentage, setIsPercentage] = useState(false);
    const [interestRate, setInterestRate] = useState(4.5);
    const [loanTerm, setLoanTerm] = useState(30);
    const [propertyTax, setPropertyTax] = useState(3600);
    const [insurance, setInsurance] = useState(1200);

    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [monthlyPrincipalInterest, setMonthlyPrincipalInterest] = useState(0);
    const [monthlyPropertyTax, setMonthlyPropertyTax] = useState(0);
    const [monthlyInsurance, setMonthlyInsurance] = useState(0);

    const handleHomePriceChange = (value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) return;
        
        setHomePrice(parsedValue);
        
        // Only update the down payment if in percentage mode
        if (isPercentage) {
            // Keep the percentage the same, calculate new amount based on new home price
            const newDownPaymentAmount = (parsedValue * downPaymentPercent) / 100;
            setDownPayment(newDownPaymentAmount);
        }
        // In dollar amount mode, we only update the percentage, not the amount
        else {
            const newPercentage = Math.round(((downPayment / parsedValue) * 100) * 10) / 10;
            setDownPaymentPercent(newPercentage);
        }
    }

    const handleDownPaymentChange = (value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) return;
        
        if (isPercentage) {
          // Update percentage and calculate new amount
          setDownPaymentPercent(parsedValue);
          setDownPayment((homePrice * parsedValue) / 100);
        } else {
          // Update amount and calculate new percentage
          setDownPayment(parsedValue);
          const newPercentage = Math.round(((parsedValue / homePrice) * 100) * 10) / 10;
          setDownPaymentPercent(newPercentage);
        }
      };

    const toggleDownPaymentType = () => {
        setIsPercentage(!isPercentage);
      };

    const calculateMortgage = () => {
        const loanAmt = homePrice - downPayment

        const monthlyRate = interestRate / 12 / 100;

        const numberOfPayments = loanTerm * 12;

        // Mortgage formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]
        let monthlyPI = 0;
        if (monthlyRate > 0) {
          monthlyPI = loanAmt * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        } else {
          monthlyPI = loanAmt / numberOfPayments;
        }

        const monthlyTax = propertyTax / 12;
        const monthlyIns = insurance / 12;

        setMonthlyPrincipalInterest(monthlyPI);
        setMonthlyPropertyTax(monthlyTax);
        setMonthlyInsurance(monthlyIns);
        setMonthlyPayment(monthlyPI + monthlyTax + monthlyIns);
    }

    useEffect(() => {
        calculateMortgage();
      }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance]);
    
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
                        value={homePrice}
                        onChange={(e) => handleHomePriceChange(e.target.value)}
                        className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="300,000"
                        />
                    </div>
                <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="10000"
                    value={homePrice}
                    onChange={(e) => handleHomePriceChange(e.target.value)}
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
                  onClick={toggleDownPaymentType}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {isPercentage ? 'Switch to Amount' : 'Switch to Percentage'}
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {isPercentage ? '%' : '$'}
                </span>
                <input
                  type="number"
                  value={isPercentage ? downPaymentPercent : downPayment}
                  onChange={(e) => handleDownPaymentChange(e.target.value)}
                  className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={isPercentage ? "20" : "60,000"}
                />
              </div>
              <input
                type="range"
                min={isPercentage ? 0 : 0}
                max={isPercentage ? 100 : homePrice}
                step={isPercentage ? 1 : 5000}
                value={isPercentage ? downPaymentPercent : downPayment}
                onChange={(e) => handleDownPaymentChange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#238dc1]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{isPercentage ? '0%' : '$0'}</span>
                <span>{isPercentage ? '100%' : `$${(homePrice / 1000).toFixed(0)}k`}</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className='flex flex-col space-y-2'>
                <label className="block text-sm font-medium text-gray-700">Interest Rate</label>
                <div className="relative">
                    <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
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
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
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
                    onClick={() => setLoanTerm(term)}
                    className={`flex-1 py-3 rounded-lg border ${
                      loanTerm === term
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
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(parseFloat(e.target.value))}
                  className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3,600"
                />
              </div>
              <p className="text-xs text-gray-500">
                Estimated at {Math.round(((propertyTax / homePrice) * 100) * 10) / 10}% of home value
              </p>
            </div>

            {/* Insurance */}
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-gray-700">Annual Homeowners Insurance</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(parseFloat(e.target.value))}
                  className="w-full py-3 pl-8 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1,200"
                />
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Monthly Payment: ${monthlyPayment.toFixed(2)}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Principal & Interest:</span>
                  <span>${monthlyPrincipalInterest.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Property Tax:</span>
                  <span>${monthlyPropertyTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Homeowners Insurance:</span>
                  <span>${monthlyInsurance.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
