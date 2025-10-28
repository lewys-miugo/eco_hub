"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  
  // Hero slider images
  const heroImages = [
    './images/solar-sky-bg.png',
    './images/solar_flower_farm.png',
    './images/solar_sunset.png'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[75vh] w-full overflow-hidden">
        {/* Image Slider */}
        <div className="relative h-full w-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero slide ${index + 1}`}
                className="h-full w-full object-cover"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-white">
            <h1 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl animate-fade-in-up">
              Your Smart Solar Assistant &amp;
              <br />
              Local Energy Marketplace!
            </h1>
            <p className="mb-8 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed animate-fade-in-up animation-delay-200">
              Get AI-powered solar recommendations, save money on energy bills, and earn income by sharing
              your surplus renewable energy with neighbors
            </p>
            <button className="bg-[#D2AB17] text-black hover:bg-yellow-400 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400">
                  <a href='/advisor'>Get Solar Advice</a>
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[#edf9fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" id="about">
            <h2 className="text-4xl font-medium text-[#163466] mb-4 animate-fade-in-up">
              About Us
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Who We Are */}
            <div className="animate-fade-in-up">
              <img
                src="./images/who_we_are.png"
                alt="Who we are"
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
              />
              <h3 className="text-4xl font-medium text-[#163466] mb-6">Who we are</h3>
              <p className="text-lg font-light text-[#163466] leading-relaxed">
                EcoPower Hub is Africa's leading AI-powered renewable energy platform, revolutionizing
                how communities access, share, and benefit from clean energy solutions. We bridge the gap
                between renewable energy technology and everyday users, making solar power accessible, 
                profitable, and sustainable for everyone.
              </p>
            </div>

            {/* Our Mission */}
            <div className="animate-fade-in-up animation-delay-200">
              <h3 className="text-4xl font-medium text-[#163466] mb-6">Our mission</h3>
              <p className="text-lg font-light text-[#163466] leading-relaxed mb-8">
                To democratize renewable energy access through AI-powered guidance and peer-to-peer
                energy trading, empowering communities to build a sustainable future while
                saving money and reducing carbon footprints.
              </p>
              <img
                src="./images/our_mission.png"
                alt="Our mission"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* What We Do */}
          <div className="mt-20 animate-fade-in-up animation-delay-400">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <img
                src="./images/what_we_do.png"
                alt="What we do"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div>
                <h3 className="text-4xl font-medium text-[#163466] mb-6">What we do</h3>
                <p className="text-lg font-light text-[#163466] leading-relaxed">
                  EcoPower Hub uses AI to simplify solar adoption and energy trading. Get personalized solar
                  advice, connect with installers, buy and sell surplus power with nearby neighbors through an
                  interactive map, and track your carbon impact, all from one platform empowering cleaner,
                  smarter communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* How It Works Section */}
      <section className="py-20 bg-[#f6fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-medium text-[#163466] mb-4 animate-fade-in-up">
              How EcoPowerHub Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center animate-fade-in-up animation-delay-200">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" className="text-[#D2AB17]">
                    <path
                      d="M6.33325 18.9997C6.33325 13.0285 6.33325 10.043 8.18824 8.18799C10.0432 6.33301 13.0288 6.33301 18.9999 6.33301C24.971 6.33301 27.9567 6.33301 29.8116 8.18799C31.6666 10.043 31.6666 13.0285 31.6666 18.9997C31.6666 24.9707 31.6666 27.9564 29.8116 29.8113C27.9567 31.6663 24.971 31.6663 18.9999 31.6663C13.0288 31.6663 10.0432 31.6663 8.18824 29.8113C6.33325 27.9564 6.33325 24.9707 6.33325 18.9997Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.875 23.75L14.7913 15.001C14.9408 14.5525 15.3605 14.25 15.8333 14.25C16.3061 14.25 16.7259 14.5525 16.8753 15.001L19.7917 23.75M13.4583 20.5833H18.2083"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#163466] mb-4">Step 1</h3>
              <p className="text-lg font-light text-[#163466] leading-relaxed">
                Tell us about your home and energy needs. Our AI analyzes your location, roof size, and usage
                to recommend the perfect solar setup for you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center animate-fade-in-up animation-delay-400">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" className="text-[#D2AB17]">
                    <path
                      d="M14.25 12.667C14.25 10.0436 16.3766 7.91699 19 7.91699C21.6234 7.91699 23.75 10.0436 23.75 12.667"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M25.006 17.417H12.9938C11.4534 17.417 10.6832 17.417 10.0928 17.8399C9.5024 18.2628 9.23197 19.0082 8.6911 20.4991L7.54227 23.6658C6.48452 26.5815 5.95564 28.0393 6.64097 29.0615C7.3263 30.0837 8.83253 30.0837 11.845 30.0837H26.1548C29.1673 30.0837 30.6735 30.0837 31.3589 29.0615C32.0442 28.0393 31.5154 26.5815 30.4576 23.6658L29.3087 20.4991C28.7678 19.0082 28.4974 18.2628 27.907 17.8399C27.3165 17.417 26.5464 17.417 25.006 17.417Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#163466] mb-4">Step 2</h3>
              <p className="text-lg font-light text-[#163466] leading-relaxed">
                Connect with certified installers in your area. Track nearest energy surplus to buy or sell
                from peer, plant, company using a map and buy at a cheap price.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center animate-fade-in-up animation-delay-600">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" className="text-[#D2AB17]">
                    <path
                      d="M34.8334 10.6872H30.4177C29.4659 10.6872 28.99 10.6872 28.5412 10.5513C28.0925 10.4154 27.6965 10.1515 26.9046 9.62349C25.7167 8.83156 24.3616 7.92814 23.6883 7.72431C23.0153 7.52051 22.3013 7.52051 20.8736 7.52051C18.9322 7.52051 17.6807 7.52051 16.8078 7.88208C15.9349 8.24365 15.2485 8.9301 13.8756 10.303L12.6674 11.5112C12.358 11.8206 12.2033 11.9753 12.1078 12.128C11.7537 12.6942 11.793 13.4217 12.2058 13.9465C12.3172 14.0881 12.4877 14.2252 12.8285 14.4996C14.0885 15.5136 15.905 15.4123 17.0459 14.2646L19.0001 12.2988H20.5834L30.0834 21.8553C30.9579 22.735 30.9579 24.1611 30.0834 25.0408C29.2089 25.9205 27.7912 25.9205 26.9167 25.0408L26.1251 24.2444"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#163466] mb-4">Step 3</h3>
              <p className="text-lg font-light text-[#163466] leading-relaxed">
                List your surplus energy on our marketplace. AI suggests fair prices and matches you with
                nearby buyers for seamless and profitable energy trading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#f6fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-2xl font-light text-[#D2AB17] mb-2">Have a Question</p>
            <h2 className="text-4xl font-medium text-[#163466] mb-2">Frequently Asked Questions</h2>
            <p className="text-2xl font-light text-[#163466]">We have Answers</p>
          </div>

          <div className="space-y-4">
            {/* FAQ Items */}
            {[
              {
                question: "What is solar energy?",
                answer: "Solar energy is power from the sun that's captured using solar panels and converted into electricity. It's renewable, clean, and helps reduce dependence on fossil fuels while lowering your carbon footprint."
              },
              {
                question: "Why is it beneficial?",
                answer: "Solar energy cuts your electricity bills, increases property value, and reduces greenhouse gas emissions. It also provides energy independence, letting you generate your own clean power and even sell the surplus for extra income."
              },
              {
                question: "Do I need any special permits or licenses to install solar panels in my area?",
                answer: "Permit requirements vary by location. Our platform connects you with certified installers who handle all necessary permits and paperwork for your area."
              },
              {
                question: "How do I buy clean energy from EcoPower Hub?",
                answer: "Simply browse our interactive map to find nearby energy suppliers, compare prices, and purchase clean energy directly from local producers in your area."
              },
              {
                question: "How do I earn money from EcoPower Hub?",
                answer: "List your surplus solar energy on our marketplace. Our AI suggests fair prices and matches you with nearby buyers, allowing you to earn income from your renewable energy investment."
              },
              {
                question: "Can it be used in winter months when the sun doesn't shine as much?",
                answer: "Yes! Solar panels still generate electricity in winter, though at reduced capacity. You can also buy energy from other users during low-production periods through our marketplace."
              },
              {
                question: "What are the benefits of installing rooftop solar panels versus buying from EcoPower Hub?",
                answer: "Installing panels gives you complete energy independence and long-term savings, while buying from EcoPower Hub offers immediate access to clean energy without upfront installation costs. Many users do both!"
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-[#edf9fd] rounded-lg shadow-sm overflow-hidden animate-fade-in-up transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-[#d4e8f0] transition-colors"
                >
                  <div className="flex items-start space-x-4 flex-1 text-left">
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#163466] mt-1">
                          <path
                            d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M8 12H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#163466] mt-1">
                          <path
                            d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M12 8V16M8 12H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-medium text-[#163466]">{faq.question}</h3>
                    </div>
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 pt-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-6"></div>
                      <p className="text-base sm:text-lg font-light text-[#163466] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}