// import { subscriptionPlans } from "@/config/subscription-plans";
// import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
// import { Checkout } from "@/app/profile/subscription/checkout";
//
// export function SubscriptionSectionOld() {
//   return (
//     <section className="grid grid-cols-1 gap-5 space-y-2 md:grid-cols-2 md:space-y-0">
//       {subscriptionPlans.map((item) => (
//         <div
//           key={item.id}
//           className={cn(
//             "space-y-5 rounded-3xl border p-8 transition delay-100 ease-in-out hover:scale-105 hover:accent-primary hover:shadow-2xl",
//             // {
//             //   "ring-2 ring-primary": i === 1,
//             // },
//           )}
//         >
//           {/**** NAME, DESCRIPTION AND AMOUNT ****/}
//           <div className="space-y-2">
//             <h2 className="text-xl font-semibold">{item.name}</h2>
//             <h3 className="text-muted-foreground">
//               <span className="text-4xl font-bold text-foreground">
//                 ${item.amount}
//               </span>{" "}
//               /month
//             </h3>
//             <p className="text-muted-foreground">{item.description}</p>
//           </div>
//           {/**** BENEFITS ****/}
//           <div className="space-y-2">
//             {item.benefits.map((item, i) => (
//               <div key={`${item}_${i}`} className="flex items-center gap-2">
//                 <Icons.check />
//                 <h3 className="text-sm text-muted-foreground">{item}</h3>
//               </div>
//             ))}
//           </div>
//           <Checkout priceId={item.stripePriceId} />
//         </div>
//       ))}
//     </section>
//   );
// }
