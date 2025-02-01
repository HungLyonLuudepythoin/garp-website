import React from 'react'
import { CircleDollarSign } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
const PriceComponent = () => {
  return (
    <div className='mt-36 mb-20 flex md:flex-row justify-between ml-6 pr-3'>
      <div className="w-1/3 font-bold md:text-7xl max-md:text-3xl">
        <h1 className='pr-44 max-sm:pr-5 max-md:pr-24'>The Price <CircleDollarSign className='inline size-20 max-md:size-8 rotate-center-normal'/> </h1>
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="">
          <p className='md:text-3xl indent-3'>
          Our pricing model is designed to provide transparent and fair rates for every ride. Service fees start from 12,500 VND for short distances, with incremental increases based on distance and time, ensuring affordability and reliability for both drivers and passengers,
          which is based on 
            <Link href="https://www.grab.com/vn/blog/driver/bike/thongtindichvu-2023/">
              <span className='bg-gradient-to-r from-emerald-400 to-cyan-700 bg-clip-text text-transparent
              hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-900'> Grab&apos;s page</span>
            </Link>.
          </p>
        </div>
        
        <div className='my-16'>
          <Table className=''>
            <TableHeader>
              <TableRow className="md:text-3xl">
                <TableHead className="w-[350px] ">Distance</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium md:text-2xl">Minimum fare for the first 2km</TableCell>
                <TableCell className="text-right md:text-2xl">12,500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium md:text-2xl">Subsequent fares per kilometer</TableCell>
                <TableCell className="text-right md:text-2xl">4,300</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default PriceComponent