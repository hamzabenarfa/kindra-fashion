"use client"

import { motion } from "framer-motion"

interface FooterColumn {
  title: string
  links: {
    label: string
    href: string
  }[]
}

interface FooterProps {
  brandName: string
  columns: FooterColumn[]
  legalLinks: {
    label: string
    href: string
  }[]
}

export default function Footer({ brandName,  columns, legalLinks }: FooterProps) {
  return (
    <motion.footer
      className="bg-black text-white mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="font-serif text-xl mb-4">{brandName}</h2>
          <p className="text-sm mb-4">KINDRA Fashion: designed for life's moments. <br /> Timeless pieces. Effortless fits. <br />Step into the season's most-worn styles.</p>

          <h3 className="text-sm font-medium mb-2">Find us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:opacity-70 transition-opacity">
              <div className="w-6 h-6 flex items-center justify-center border border-white rounded-sm">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              <div className="w-6 h-6 flex items-center justify-center border border-white rounded-sm">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              <div className="w-6 h-6 flex items-center justify-center border border-white rounded-sm">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </div>
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              <div className="w-6 h-6 flex items-center justify-center border border-white rounded-sm">
                <span className="sr-only">Pinterest</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </a>
          </div>
        </div>

        {columns.map((column, index) => (
          <div key={index} className="">
            <h3 className="text-sm font-medium mb-4">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 py-6 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            © {brandName} {new Date().getFullYear()} - All Rights Reserved
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link, index) => (
              <a key={index} href={link.href} className="text-xs text-gray-400 hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
