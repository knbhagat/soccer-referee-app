import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'
import { ProgressProvider } from '@/context/ProgressContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Soccer Referee Assistant Platform',
  description: 'A comprehensive web application designed to enhance soccer referee training and provide accurate rule clarification.',
  keywords: 'soccer, referee, training, rules, FIFA, officiating',
  authors: [{ name: 'Krishaan Bhagat' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </AppProvider>
      </body>
    </html>
  )
}
