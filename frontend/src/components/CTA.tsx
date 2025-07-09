import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const CTA = () => {
    const { authUser } = useAuthStore();
  return (
    <main className="max-h-[50vh] w-full bg-black text-white px-10 md:px-10 py-6 rounded-3xl">
      {!authUser && (
        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Why Join ArtistBlog?</h2>
            <ul className="space-y-3 text-muted-foreground text-base">
              <li>✅ Create and share your blog posts with the world.</li>
              <li>💬 Comment and connect with fellow artists.</li>
              <li>❤️ Like and engage with your favorite content.</li>
              <li>🎯 Build your creative audience.</li>
            </ul>
          </div>

          <div className="bg-white text-black rounded-xl p-6 shadow-lg flex flex-col gap-4">
            <h3 className="text-xl font-bold">One click to get started</h3>
            <p className="text-sm text-gray-600">
              Start sharing your voice today with just a few steps.
            </p>
            <div className="flex gap-4">
              <Link to="/register">
                <Button className="w-full">Register</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default CTA
