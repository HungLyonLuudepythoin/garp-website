"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import socket from "@/app/socket";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../components/ui/dialog"
import trackLocation from '../lib/map/streamPlace'

interface LocationData {
  startPlace: string;
  endPlace: string;
  phoneNumber: string;
  menu: string;
  price: string;
}

const Adminpage = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [agreedOrders, setAgreedOrders] = useState<string[]>([]);

  // Load cached data on component mount
  useEffect(() => {
    const handleLocationReceived = (data: LocationData) => {
      setLocations((prevLocations) => [...prevLocations, data]);
    };

    socket.on("location-received", handleLocationReceived);

    const loadCachedData = () => {
      const cachedLocations = localStorage.getItem("locations");
      const cachedAgreedOrders = localStorage.getItem("agreedOrders");
      if (cachedLocations) {
        setLocations(JSON.parse(cachedLocations));
      }
      if (cachedAgreedOrders) {
        setAgreedOrders(JSON.parse(cachedAgreedOrders));
      }
    };
    loadCachedData();

    return () => {
      socket.off("location-received", handleLocationReceived);
    };
  }, []);

  // Save locations and agreedOrders to localStorage whenever they update
  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem("agreedOrders", JSON.stringify(agreedOrders));
  }, [agreedOrders]);

  useEffect(() => {
    const cleanup = trackLocation(); // Start location tracking
    return cleanup; // Cleanup when component unmounts
  }, []);

  const handleAcceptOrder = (order: LocationData) => async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    socket.emit("send-accept", {
      phoneNumber: order.phoneNumber,
      message: `Your order from ${order.startPlace} to ${order.endPlace} has been accepted.`,
    });
    alert(`Accepted order for customer: ${order.phoneNumber}`);
    setAgreedOrders((prev) => [...prev, order.phoneNumber]);
  };

  const handleDeleteOrder = (phoneNumber: string) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.phoneNumber !== phoneNumber)
    );
    setAgreedOrders((prev) =>
      prev.filter((agreedPhoneNumber) => agreedPhoneNumber !== phoneNumber)
    );
    socket.emit("driver-redirect-dashboard", phoneNumber);
  };

  return (
    <div>
      <Link href={"/dashboard"}>Go to dashboard</Link>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Start Place</TableHead>
              <TableHead className="w-[150px]">End Place</TableHead>
              <TableHead className="w-[100px]">Phone Number</TableHead>
              <TableHead>Menu</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Agree</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{location.startPlace}</TableCell>
                <TableCell>{location.endPlace}</TableCell>
                <TableCell>{location.phoneNumber}</TableCell>
                <TableCell>{location.menu}</TableCell>
                <TableCell className="text-right">{location.price}</TableCell>
                <TableCell className="text-center">
                  {agreedOrders.includes(location.phoneNumber) ? (
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteOrder(location.phoneNumber)}
                    >
                      Delete
                    </button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button>Agree</button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Do you agree with this order?</DialogTitle>
                          <DialogDescription>
                            You have to finish the previous order.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                          <button onClick={handleAcceptOrder(location)}>
                            Send the acceptance
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Adminpage;
