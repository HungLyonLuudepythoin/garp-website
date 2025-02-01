import Image from 'next/image';
import React from 'react';

const TargetComponent = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start px-2 max-md:px-6 my-16">
      <h1 className="text-center md:text-6xl text-5xl font-bold mt-6 my-20">
        The Purpose
      </h1>
      <div className="flex md:flex-row-reverse max-md:flex-col justify-between w-full">
        <div className="relative w-3/5 overflow-hidden rounded-lg max-md:h-[400px] max-md:w-full max-md:ml-5 max-md:mr-3">
          <div className="absolute inset-0 flex animate-slide">
            <div className="w-full flex-shrink-0 relative">
              <Image
                src="/homeless1.png"
                alt="Image 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full flex-shrink-0 relative">
              <Image
                src="/homeless2.png"
                alt="Image 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full flex-shrink-0 relative">
              <Image
                src="/homeless3.png"
                alt="Image 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full flex-shrink-0 relative">
              <Image
                src="/homeless4.png"
                alt="Image 4"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full flex-shrink-0 relative">
              <Image
                src="/homeless5.png"
                alt="Image 5"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="md:w-2/5 max-md:w-full max-md:my-10 max-md:flex flex-row justify-between">
          <p className="text-xl xl:text-5xl mr-6 max-md:mr-8 max-md:w-2/3 md:px-10 bg-gradient-to-r from-slate-800 to-gray-900 bg-clip-text text-transparent">
            With Garp, every delivery makes a difference. All of the earnings from our dedicated drivers go directly to 
            supporting homeless individuals in Ho Chi Minh City. Join me in creating a positive impact, one ride at a time!
          </p>
          <div className="md:hidden max-md:w-1/3">
            <h2 className="text-lg font-semibold text-end">
              My Target
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetComponent;
