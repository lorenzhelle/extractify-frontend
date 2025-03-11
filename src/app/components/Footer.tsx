import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <Image
            src="/images/uhh-logo.svg"
            alt="University of Hamburg Logo"
            width={120}
            height={40}
            className="mr-4"
          />
        </div>
        <div className="text-sm text-gray-600 text-center md:text-right">
          <p>Created for demonstration of a study for University of Hamburg</p>
          <p>
            By Lorenz Helle, M.Sc. Wirtschaftsinformatik, in{" "}
            <a
              href="https://www.inf.uni-hamburg.de/en/inst/ab/lt/home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LT group
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
