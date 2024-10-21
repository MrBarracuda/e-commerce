import Link from "next/link";

export function Footer() {
  return (
    <>
      <footer className="border-t bg-gray-100 dark:bg-background">
        <div className="mx-auto max-w-screen-xl p-4 py-6 md:p-8 lg:p-10 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3">
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Company
              </h3>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Help center
              </h3>
              <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Legal
              </h3>
              <ul className="text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/terms-of-service" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/*<div className="mt-8 flex justify-center">*/}
          {/*  <ModeToggle />*/}
          {/*</div>*/}
        </div>
      </footer>
      <footer className="border-t px-5 py-8">
        <div className="text-center">
          <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 <Link href="/">LuxeScents</Link>. All Rights Reserved. Built
            with ❤️ by theBarracuds
          </span>
        </div>
      </footer>
    </>
  );
}
