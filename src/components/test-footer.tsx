import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Content() {
  return (
    // bg-[#4E4E5A] nice dark grey velvet ish color
    <div className="flex h-full w-full flex-col justify-between bg-black px-0 py-8 text-white">
      <Section2 />
      <Section1 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div className="px-10">
      <div className="flex justify-between">
        <Nav />
      </div>
    </div>
  );
};

const Section2 = () => {
  return (
    <h2 className="mx-auto text-[16vw] font-bold uppercase leading-none tracking-wider">
      <Link href="/" className="">
        {siteConfig.name}
      </Link>
    </h2>
  );
};

const Nav = () => {
  return (
    <div className="flex shrink-0 gap-20">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
        <p>Home</p>
        <p>Projects</p>
        <p>Our Mission</p>
        <p>Contact Us</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[#ffffff80]">Education</h3>
        <p>News</p>
        <p>Learn</p>
        <p>Certification</p>
        <p>Publications</p>
      </div>
    </div>
  );
};
