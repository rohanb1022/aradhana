import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Comment } from "@/store/useBlogStore";

interface Blog {
 _id?: string;
  title: string;
  content: string;
  topics: string[];
  image : string;
  owner: {
    username: string;
    _id: string;
  };
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface BlogCardProps {
  blog: Blog;
}

const defaultPage = "https://plus.unsplash.com/premium_photo-1706382043344-4a901b8e1864?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2hub2xvZ2ljYWwlMjBibG9nc3xlbnwwfHwwfHx8MA%3D%3D"

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full md:w-[300px] lg:w-[280px] xl:w-[260px] max-h-[420px] overflow-hidden rounded-md"
    >
      <Card className="bg-black text-white border-white/10 shadow-md hover:shadow-xl transition duration-300">
        {/* {blog.imageUrl && ( */}
          {<img
            src={blog.image || defaultPage} 
            alt={blog.title}
            className="w-[220px] mx-auto h-32 object-cover rounded-t-md"
          />
        }

        <CardHeader>
          <CardTitle className="text-lg truncate">{blog.title}</CardTitle>
          <p className="text-gray-500 text-sm w-fit h-fit" >@{blog.owner.username}</p>
          <CardDescription className="text-white/60 line-clamp-1">
            {blog.content}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-clip flex gap-1">
            {blog.topics.map((topic, idx) => (
              <Badge key={idx} variant="secondary" className="bg-white text-black tracking-tight text-[0.7rem]">
                {topic}
              </Badge>
            ))}
          </div>
            <Button 
              variant="outline" 
              className="w-full text-black bg-white hover:bg-gray-100 mt-4 "
              onClick={() => window.location.href = `/detailedPost/${blog._id}`} 
            >
              View
            </Button>
        </CardContent>

        <CardFooter className="text-xs text-white/40">
          <p>{blog.createdAt.split("T")[0]}</p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogCard;


