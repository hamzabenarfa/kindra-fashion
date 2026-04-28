"use client";

import { motion } from "framer-motion";
import { Package, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyCategoryStateProps {
    categoryName: string;
    section: string;
}

export function EmptyCategoryState({ categoryName, section }: EmptyCategoryStateProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md"
            >
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-8 relative inline-block"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full blur-2xl opacity-50" />
                    <div className="relative bg-white p-8 rounded-full shadow-lg">
                        <Package className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
                    </div>

                    {/* Floating sparkles */}
                    <motion.div
                        animate={{
                            y: [-10, -15, -10],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-2 -right-2"
                    >
                        <Sparkles className="w-6 h-6 text-gray-400" />
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-3">
                        No Products Yet
                    </h2>
                    <p className="text-gray-500 mb-2 text-sm tracking-wide">
                        We're currently curating our {categoryName} collection.
                    </p>
                    <p className="text-gray-400 mb-8 text-xs">
                        Check back soon for exciting new arrivals
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href={`/${section}`}>
                            <Button
                                variant="outline"
                                className="border-gray-300 hover:bg-gray-50 transition-all duration-300 group"
                            >
                                <ShoppingBag className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                Explore {section.charAt(0).toUpperCase() + section.slice(1)}
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button className="bg-black hover:bg-gray-800 transition-all duration-300">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-gray-50 to-transparent rounded-full blur-3xl opacity-30"
                />
            </motion.div>
        </div>
    );
}
