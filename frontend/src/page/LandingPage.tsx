import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CTA from "@/components/CTA";
import { useAuthStore } from "@/store/useAuthStore";

const LandingPage = () => {
  const { authUser } = useAuthStore();
  return (
    <main className="max-h-[90vh] w-full bg-black text-white px-10 md:px-10 py-10 rounded-3xl ">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 ">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Discover. Create. Connect.
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
          ArtistBlog is your space to share art, ideas, and inspiration. Join the community of creators and express yourself.
        </p>
        {!authUser && (
          <div className="flex gap-4 mt-4">
            <Link to="/posts">
              <Button variant="outline" className="border-white text-black hover:bg-white">
                <ReadBlogs/>
              </Button>
            </Link>
          </div>
        )}
      </section>
      <CTA/>
    </main>
  );
};

export default LandingPage;

export function ReadBlogs() {
  return (
    <h4 className="scroll-m-20 text-2xl p-4 font-semibold tracking-tighter">
      Read Blogs
    </h4>
  )
}
