import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CTA from "@/components/CTA";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const LandingPage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/posts");
    }
  }, [authUser]);

  return (
    <main className="w-full min-h-[90vh] bg-black text-white px-6 sm:px-8 md:px-10 py-10 rounded-3xl flex flex-col justify-between">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          Share Your Thoughts. Explore New Ideas.
        </h1>

        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl">
          Aradhana is a place to write, discover, and engage with blogs across tech, lifestyle, education, and more — powered by AI.
        </p>

        {!authUser && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/posts">
              <Button
                variant="outline"
                className="border-white text-black bg-white hover:bg-gray-200 transition"
              >
                <span className="text-lg font-semibold">Read Blogs</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">
                <span className="text-lg font-semibold">Get Started</span>
              </Button>
            </Link>
          </div>
        )}
      </section>

      <div className="mt-10 sm:mt-16">
        <CTA />
      </div>
    </main>
  );
};

export default LandingPage;
