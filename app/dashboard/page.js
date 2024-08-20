"use client"
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    document.title = "Dashboard - get me A Chai"
    if (status === "loading") return; // Wait for session to load
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  // If the session is still loading, you might want to show a loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default Page;

