// type User = {
//   avatar: string | null,
//   created_at: string,
//   email: string,
//   first_name: string | null,
//   id: string,
//   password: string | null,
//   phone_number: string | null,
//   username: string,
//   subscription: {
//     email: string,
//     created_at: string,
//     expires_at: string,
//     customer_id: string,
//     subscription_id: string,
//   }
// };

export function SubscriptionInfo({user}: {user: any}) {

  return (<div>
    <h1>This is protected data</h1>
  </div>);
}