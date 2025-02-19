'use client';

import Image from 'next/image';

const timelineData = [
    { year: '1995', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolore magna aliqua.' },
    { year: '2005', text: 'Dolor sit amet, consectetur adipiscing elit ut labore et dolore magna aliqua.' },
    { year: '2017', text: 'Ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt.' }
];

    export default function HistoryTimeline() {

    return (
        <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        {timelineData.map((item, index) => (
                            <div key={index} className="flex items-center mb-6">
                                <div className="bg-gray-700 text-white font-bold py-2 px-6 rounded-md">{item.year}</div>
                                <div className="ml-6 p-4 bg-white shadow-md rounded-lg relative">
                                    <div className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 border-l-4 border-yellow-500 h-4"></div>
                                    <p className="text-gray-700">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative">
                        <Image src="/demo/history-image.jpg" alt="Baking History" width={600} height={400} className="rounded-lg shadow-md" />
                    </div>
                </div>
            </div>
        </section>
    );
};

