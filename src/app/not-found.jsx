import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 font-dmsans">
            <h1 className="text-5xl font-bold text-center mb-4">
                404<br/>Page Not Found
            </h1>
            <p className="text-lg text-center mb-8">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link href="/" className="bg-blue-500 lg:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                Go back to home page
            </Link>
        </main>
    );
}
