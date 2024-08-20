import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="text-white flex justify-center h-[44vh] flex-col items-center gap-4 px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold md:text-4xl mt-10 text-2xl">Get me a Chai</div>
        <p className="text-center md:text-left">A crowdfunding platform for creators - Get funded by your fans and followers. Start now</p>
        <p className="text-center md:text-left">A place where your fans can buy you a chai</p>
        <div>
          <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start here</button></Link>

          <Link  href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button></Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10">
              </div>

      <section className="text-white container mx-auto pb-32 mt-6 px-10">
        <h2 className="text-2xl font-bold text-center mb-6">Your fans can buy you a Chai</h2>
        <div className="flex gap-5 md:justify-evenly text-center md:gap-1 justify-center">
          {["https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzlkNHZyMzZ1eWlzYThqbndzMG50cjlsN2JyODR0eHA2cmN5aWhpaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2WMhNcyFOWP280/giphy.webp", "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJuY2V6cDdtbjlqODUybG92Nm94Zm50NzRjN2FsMm9ua2d0d2JhbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EIfaSXvq0mDnbtQajF/giphy.gif", "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGNteHAxY3J3YjBicGZyOWh0YnU0YXkxdHlkOXd0aXkxYTFvOXNuNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6Mh8DXPL27UpNYp8o4/giphy.gif"].map((src, index) => (
            <div key={index} className="item space-y-3 flex flex-col items-center justify-center">
              <div className="size-24 rounded-full p-2" >
              <img className="bg-slate-400 rounded-full p-2 object-cover" width={88} height={88} src={src} alt={`Image representing ${src}`} />
              </div>
              <p className="font-bold">Fans want to help</p>
              <p>Your fans are available to help you</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-white h-1 opacity-10">
      </div>

      <section className="text-white container  pb-10 mt-6">
        <h2 className="text-2xl font-bold text-center mb-6">Learn More About Us</h2>
        <div className=" m-auto flex items-center justify-center w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
        <iframe   src="https://www.youtube.com/embed/pD-pXbY-GH4?si=UeIRuddIEf6qa487" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </section>
    </>
  );
}
