"use client";

import { useState } from "react";
import Image from "next/image";
import ItemCard from "./_components/card";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CheckoutPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [codeOpen, setCodeOpen] = useState(false);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <>
      <div className="bg-black text-white text-center py-2 text-sm my-12 fixed top-5 w-full z-10">
        FREE SHIPPING STARTING FROM 300 TND PURCHASE
      </div>
      <main className="px-4 py-8  flex flex-col md:flex-row gap-12 mt-24">
        <div className="w-full flex flex-col   gap-4  items-center justify-start ">
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-medium">SHOPPING BAG (3)</h2>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">TOTAL</h2>
              <p className="text-lg font-medium">576.00TND</p>
            </div>

            <div className="border-t border-b py-4 my-6">
              <button
                className="flex justify-between items-center w-full"
                onClick={() => setCodeOpen(!codeOpen)}
              >
                {!codeOpen && (
                  <h3 className="text-sm font-medium">ENTER PERSONAL CODE</h3>
                )}
              </button>
              <AnimatePresence>
                {codeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="py-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          placeholder="ENTER YOUR PERSONAL CODE"
                          className="text-sm text-gray-500 outline-none w-full border-none focus:ring-0"
                        />
                        <button className="font-medium text-sm ml-2 cursor-pointer hover:text-black">
                          APPLY
                        </button>
                      </div>
                      <div className="mt-1 border-b border-black"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="text-sm">SUB TOTAL</p>
                <p className="text-sm">567.00TND</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">SHIPPING COST</p>
                <p className="text-sm">FREE</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">SALES TAX</p>
                <p className="text-sm">0.00TND</p>
              </div>
            </div>

            <Link href={"/cart/checkout"}>
              <button className="w-full cursor-pointer bg-black text-white py-3 mt-6 font-medium">
                CHECKOUT
              </button>
            </Link>

            <div className="flex justify-between items-center mt-6">
              <Image
                src="/payment/master.svg"
                alt="Mastercard"
                width={40}
                height={32}
              />
              <Image
                src="/payment/Payoneer.png"
                alt="Payoneer"
                width={40}
                height={32}
              />
              <Image
                src="/payment/AmazonPay.png"
                alt="Amazon Pay"
                width={40}
                height={32}
              />
              <Image
                src="/payment/GooglePay.png"
                alt="Google Pay"
                width={40}
                height={32}
              />
              <Image
                src="/payment/visa.png"
                alt="Visa"
                width={40}
                height={32}
              />
              <Image
                src="/payment/Discover.png"
                alt="Visa"
                width={40}
                height={32}
              />
            </div>
          </div>

          {/* Accordion sections */}
          <div className="space-y-4">
            <div className="border-b pb-4">
              <button
                className="flex justify-between items-center w-full"
                onClick={() => toggleSection("shipping")}
              >
                <span className="text-sm font-medium">SHIPPING DETAILS</span>
                <span className="text-2xl">
                  {openSection === "shipping" ? "-" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openSection === "shipping" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="mb-2">
                        Standard shipping (3-5 business days): FREE on orders
                        over 300 TND
                      </p>
                      <p className="mb-2">
                        Express shipping (1-2 business days): 25 TND
                      </p>
                      <p>
                        International shipping available to select countries.
                        Customs fees may apply.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-b pb-4">
              <button
                className="flex justify-between items-center w-full"
                onClick={() => toggleSection("return")}
              >
                <span className="text-sm font-medium">RETURN POLICY</span>
                <span className="text-2xl">
                  {openSection === "return" ? "-" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openSection === "return" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="mb-2">
                        We accept returns within 30 days of purchase.
                      </p>
                      <p className="mb-2">
                        Items must be unworn, unwashed, and with original tags
                        attached.
                      </p>
                      <p>
                        Refunds will be processed within 7-10 business days
                        after we receive your return.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-b pb-4">
              <button
                className="flex justify-between items-center w-full"
                onClick={() => toggleSection("secure")}
              >
                <span className="text-sm font-medium">SECURE SHOPPING</span>
                <span className="text-2xl">
                  {openSection === "secure" ? "-" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openSection === "secure" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="mb-2">
                        All transactions are secured with SSL encryption.
                      </p>
                      <p className="mb-2">
                        We never store your complete credit card information.
                      </p>
                      <p>
                        Multiple payment options available for your convenience
                        and security.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
      </main>
    </>
  );
}
