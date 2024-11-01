import Link from "next/link";
import Content from "@/components/test-footer";

// function Footer() {
//   return (
//     <StickyFooter>
//       <footer className="mx-auto max-w-screen-xl">
//         <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3">
//           <div>
//             <h3 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
//               Company
//             </h3>
//           </div>
//           <div>
//             <h3 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
//               Help center
//             </h3>
//             <ul className="text-gray-500 dark:text-gray-400">
//               <li className="mb-4">
//                 <a href="#" className="hover:underline">
//                   Twitter
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
//               Legal
//             </h3>
//             <ul className="text-gray-500 dark:text-gray-400">
//               <li className="mb-4">
//                 <Link href="/privacy" className="hover:underline">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li className="mb-4">
//                 <Link href="/terms-of-service" className="hover:underline">
//                   Terms of Service
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </footer>
//     </StickyFooter>
//   );
// }

function StickyFooter({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative h-[600px]"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%",
      }}
    >
      <div className="relative -top-[100vh] h-[calc(100vh+600px)]">
        <footer className="sticky top-[calc(100vh-600px)] h-[600px]">
          {/*<div className="flex h-full w-full flex-col bg-accent p-4 py-6 md:p-8 lg:p-10 lg:py-16">*/}
          {children}
          {/*</div>*/}
        </footer>
      </div>
    </div>
  );
}

export function TestFooter() {
  return (
    <StickyFooter>
      <Content />
    </StickyFooter>
  );
}
