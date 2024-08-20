import React from 'react';
import Link from 'next/link';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto py-16 px-4">
                <h1 className="text-4xl font-bold text-center mb-8">About Get Me A Chai</h1>
                <p className="text-lg leading-relaxed mb-6">
                    Get Me A Chai is a platform where creators can showcase their talents, share their creations, and connect with their audience. 
                    Our mission is to empower creators to monetize their passion by allowing supporters to contribute directly to their favorite creatrs.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Whether you&apos;re an artist, writer, musician, or content creator, Get Me A Chai gives you the tools to build your own page, 
                    share your work, and receive support from your community. We believe that creators should have the freedom to create 
                    without the constraints of traditional funding models, and our platform is designed to make that possible.
                </p>
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-lg leading-relaxed mb-6">
                    As a creator, you can sign up and create your own page where you can showcase your work, share updates, and connect with your audience. 
                    Supporters can visit your page, view your content, and donate to help you continue creating. Whether it&apos;s a one-time contribution or 
                    ongoing support, every donation helps you keep doing what you love.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Our platform is built to be user-friendly and accessible, ensuring that creators can focus on their craft while we handle the rest. 
                    We provide a secure and seamless payment system, so you can receive donations from anywhere in the world.
                </p>
                <h2 className="text-3xl font-bold mb-4">Join Us</h2>
                <p className="text-lg leading-relaxed">
                    Get Me A Chai is more than just a platform; it&apos;s a community of creators and supporters who believe in the power of creativity. 
                    Whether you&apos;re here to share your work or support others, we&apos;re excited to have you as part of our community.
                </p>
                <div className="text-center mt-12">
                    <Link href="/" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default About;

export const metadata = {
    title: "About - Get Me A Chai"
}
