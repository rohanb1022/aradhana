import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const CTA = () => {
  const { authUser } = useAuthStore();

  return (
    <main className="w-full bg-black text-white px-6 sm:px-8 md:px-10 py-10 rounded-3xl">
      {!authUser && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Why Join Aradhana?</h2>
            <ul className="space-y-3 text-gray-400 text-base sm:text-lg">
              <li>✅ Create and share your own blog posts.</li>
              <li>💬 Comment and engage with other readers and writers.</li>
              <li>❤️ Like and support your favorite content.</li>
              <li>🎯 Build your personal presence as a writer.</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="bg-white text-black rounded-xl p-6 sm:p-8 shadow-lg flex flex-col gap-4">
            <h3 className="text-lg sm:text-xl font-bold">One click to get started</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Start sharing your voice today — no experience needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link to="/register" className="w-full">
                <Button className="w-full">Register</Button>
              </Link>
              <Link to="/login" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-black text-black hover:bg-black hover:text-white"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CTA;
