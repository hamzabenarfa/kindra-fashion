"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AnimatedProductDetailsProps {
  formattedProduct: string
  description: string
  category?: string
  name: string
}

export function AnimatedProductDetails({ formattedProduct, description, category, name }: AnimatedProductDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-xl font-medium mb-2 capitalize"
      >
        {formattedProduct}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-sm text-[#6f6f6f] mb-6"
      >
        {description}
      </motion.p>

      <Tabs defaultValue="details" className="mt-12 h-96">
        <TabsList className="w-full grid grid-cols-3 bg-transparent border-b border-[#eaeaea]">
          <TabsTrigger
            value="details"
            className="text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-b-[#222222] data-[state=active]:rounded-none data-[state=active]:shadow-none bg-transparent"
          >
            DETAILS
          </TabsTrigger>
          <TabsTrigger
            value="size"
            className="text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-b-[#222222] data-[state=active]:rounded-none data-[state=active]:shadow-none bg-transparent"
          >
            SIZE & FIT
          </TabsTrigger>
          <TabsTrigger
            value="delivery"
            className="text-xs font-medium data-[state=active]:border-b-2 data-[state=active]:border-b-[#222222] data-[state=active]:rounded-none data-[state=active]:shadow-none bg-transparent"
          >
            DELIVERY & RETURNS
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent key="details" value="details" className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-sm font-medium uppercase mb-4">
                {category === "shoes" ? "WHITE PLATFORM TRAINERS" : name.toUpperCase()}
              </h3>

              <div className="text-sm mb-4">
                <div className="mb-2">Composition:</div>
                <div className="text-[#6f6f6f]">100% Cotton</div>
              </div>

              <div className="text-sm mb-4">
                <div className="mb-2">Materials:</div>
                <ul className="text-[#6f6f6f]">
                  <li>• Upper: Synthetic</li>
                  <li>• Main: Smooth</li>
                  <li>• Lining: Recycled polyester</li>
                  <li>• Sole: Leather</li>
                </ul>
              </div>

              <div className="text-sm">
                <div className="mb-2">Features:</div>
                <ul className="text-[#6f6f6f]">
                  <li>• Low top sneaker</li>
                  <li>• Closed round toe</li>
                  <li>• Laces closure</li>
                </ul>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent key="size" value="size" className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-[#6f6f6f]">
                This product fits true to size. We recommend ordering your normal size.
              </p>
            </motion.div>
          </TabsContent>
          <TabsContent key="delivery" value="delivery" className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-[#6f6f6f]">
                Free standard delivery for orders over 100 TND.
                <br />
                Delivery within 3-5 working days.
                <br />
                Returns accepted within 30 days.
              </p>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  )
}
