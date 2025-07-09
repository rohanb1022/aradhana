import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Blog {
  _id?: string;
  title: string;
  content: string;
  topics: string[];
  imageUrl?: string; // optional in case image feature is not used yet
  createdAt: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full md:w-[300px] lg:w-[280px] xl:w-[260px] max-h-[400px] overflow-hidden rounded-md"
    >
      <Card className="bg-black text-white border-white/10 shadow-md hover:shadow-xl transition duration-300">
        {/* {blog.imageUrl && ( */}
          {<img
            src="https://images.unsplash.com/photo-1659600558336-0ec6e8f58388?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={blog.title}
            className="w-[245px] mx-auto h-40 object-cover rounded-t-md"
          />
        }

        <CardHeader>
          <CardTitle className="text-lg truncate">{blog.title}</CardTitle>
          <CardDescription className="text-white/60 line-clamp-1">
            {blog.content}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.topics.map((topic, idx) => (
              <Badge key={idx} variant="secondary" className="bg-white text-black">
                {topic}
              </Badge>
            ))}
          </div>
            <Button variant="outline" className="w-full text-black bg-white hover:bg-gray-100" >View</Button>
        </CardContent>

        <CardFooter className="text-xs text-white/40">
          <p>{blog.createdAt.split("T")[0]}</p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogCard;


