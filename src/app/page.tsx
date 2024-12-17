'use client'

import dynamic from 'next/dynamic'

const PlanningPoker = dynamic(() => import('@/components/PlanningPoker'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <PlanningPoker />
    </main>
  )
}