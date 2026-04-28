import Image from "next/image";
import Link from "next/link";

export default function Payment() {
  return (
    <>
      <div className="bg-black text-white text-center py-2 text-sm my-12 fixed top-5 w-full z-10">
        FREE SHIPPING STARTING FROM 300 TND PURCHASE
      </div>
      <main className="px-4 py-8 flex flex-col md:flex-row gap-12 mt-32">
        {/* Left column - Customer information */}
        <div className="w-full space-y-8 lg:px-20">
          <section>
            <h2 className="text-lg font-bold mb-6 text-[#000000]">
              Payment
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-[#000000] mb-1"
                >
                  CARD HOLDER NAME<span className="text-[#000000]">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full border-b border-[#000000] py-2 focus:outline-none bg-transparent"
                  placeholder="CARD HOLDER NAME"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-[#000000] mb-1"
                >
                  CARD NUMBER<span className="text-[#000000]">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full border-b border-[#000000] py-2 focus:outline-none bg-transparent"
                  placeholder="CARD NUMBER"
                />
              </div>

              <div>
                <label
                  htmlFor="CVV"
                  className="block text-sm font-medium text-[#000000] mb-1"
                >
                  CVV<span className="text-[#000000]">*</span>
                </label>
                <input
                  type="tel"
                  id="CVV"
                  className="w-full border-b border-[#000000] py-2 focus:outline-none bg-transparent"
                  placeholder="CVV"
                />
              </div>
              <div>
                <label
                  htmlFor="CVV"
                  className="block text-sm font-medium text-[#000000] mb-1"
                >
                  EXPIRATION DATE<span className="text-[#000000]">*</span>
                </label>
                <input
                  type="tel"
                  id="CVV"
                  className="w-full border-b border-[#000000] py-2 focus:outline-none bg-transparent"
                  placeholder="EXPIRATION DATE"
                />
              </div>
            </div>
          </section>

  
        </div>

        {/* Right column - Order summary */}
        <div className="w-full max-w-md">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm text-[#000000]">ITEMS (3)</h2>
            </div>

            <div className="flex justify-between items-center border-b border-[#e9e9e9] pb-4">
              <h3 className="text-lg font-bold text-[#000000]">TOTAL</h3>
              <span className="text-lg font-bold text-[#000000]">
                576.00TND
              </span>
            </div>

         {/* Product list */}
                     <div className="space-y-6">
                       {/* Product 1 */}
                       <div className="flex gap-4">
                         <div className="w-24 h-24 bg-[#f9f9f9] flex items-center justify-center">
                           <Image
                             src="/checkout-img1.jpg"
                             alt="White Platform Trainers"
                             width={96}
                             height={96}
                             className="object-contain"
                           />
                         </div>
                         <div className="flex-1">
                           <h4 className="font-medium text-[#000000]">
                             LEATHER WOMEN BAG
                           </h4>
                           <p className="text-sm text-[#000000]">KINDRA</p>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-[#000000]">COLOR:</span>
                             <div className="w-4 h-4 border border-[#e9e9e9] bg-white"></div>
                           </div>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-[#000000]">SIZE:</span>
                             <span className="text-sm text-[#000000]">37</span>
                           </div>
                         </div>
                       </div>
         
                       {/* Product 2 */}
                       <div className="flex gap-4">
                         <div className="w-24 h-24 bg-[#f9f9f9] flex items-center justify-center">
                           <Image
                            src="/checkout-img2.jpg"
                             alt="Polo Men T-Shirt"
                             width={96}
                             height={96}
                             className="object-contain"
                           />
                         </div>
                         <div className="flex-1">
                           <h4 className="font-medium text-[#000000]">
                             POLO MEN T-SHIRT
                           </h4>
                           <p className="text-sm text-[#000000]">KINDRA</p>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-[#000000]">COLOR:</span>
                             <div className="w-4 h-4 border border-[#e9e9e9] bg-[#927162]"></div>
                           </div>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-[#000000]">SIZE:</span>
                             <span className="text-sm text-[#000000]">M</span>
                           </div>
                         </div>
                       </div>
         
                       {/* Product 3 */}
                       <div className="flex gap-4">
                         <div className="w-24 h-24 bg-[#f9f9f9] flex items-center justify-center">
                           <Image
                            src="/checkout-img3.jpg"
                             alt="Leather Purse Women"
                             width={96}
                             height={96}
                             className="object-contain"
                           />
                         </div>
                         <div className="flex-1">
                           <h4 className="font-medium text-[#000000]">
                             BLACK MEN TROUSERS
                           </h4>
                           <p className="text-sm text-[#000000]">KINDRA</p>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-[#000000]">COLOR:</span>
                             <div className="w-4 h-4 border border-[#e9e9e9] bg-[#161616]"></div>
                           </div>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-[#000000]">SIZE:</span>
                             <span className="text-sm text-[#000000]">M</span>
                           </div>
                         </div>
                       </div>
         
                       {/* Product 4 */}
                       <div className="flex gap-4">
                         <div className="w-24 h-24 bg-[#f9f9f9] flex items-center justify-center">
                           <Image
                              src="/checkout-img4.jpg"
                             alt="Black Trousers Men"
                             width={96}
                             height={96}
                             className="object-contain"
                           />
                         </div>
                         <div className="flex-1">
                           <h4 className="font-medium text-[#000000]">
                             WOMEN BLAZER
                           </h4>
                           <p className="text-sm text-[#000000]">KINDRA</p>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-[#000000]">COLOR:</span>
                             <div className="w-4 h-4 border border-[#e9e9e9] bg-black"></div>
                           </div>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-sm text-[#000000]">SIZE:</span>
                             <span className="text-sm text-[#000000]">L</span>
                           </div>
                         </div>
                       </div>
                     </div>

        <Link href={"/cart/payment"} >
            <button className="w-full cursor-pointer bg-[#000000] text-white py-4 mt-6 hover:bg-[#222222] transition-colors">
              ORDER
            </button>
        </Link>
          </div>
        </div>
      </main>
    </>
  );
}
