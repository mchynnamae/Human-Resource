import React from 'react';

interface LandingPageProps {
    onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
    const hospitalImageUrl = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop";

    return (
        <div className="relative min-h-screen bg-teal-800 text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={hospitalImageUrl} 
                    alt="Modern hospital interior" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-teal-900/60 backdrop-blur-sm"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-4">
                <div className="flex-grow flex flex-col items-center justify-center">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-shadow">Human Resource</h1>
                    <p className="mt-4 text-xl md:text-2xl text-teal-100 text-shadow-sm">Cloud Ink Co.</p>
                    <p className="mt-1 text-sm text-teal-200 tracking-wider uppercase text-shadow-sm">Hospital Department Analytics</p>
                </div>
                <div className="w-full flex justify-center pb-8">
                    <button
                        onClick={onEnter}
                        aria-label="Open Dashboard"
                        className="group animate-bounce bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white group-hover:scale-110 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
             <style>{`
                .text-shadow { text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4); }
                .text-shadow-sm { text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3); }
            `}</style>
        </div>
    );
};

export default LandingPage;
