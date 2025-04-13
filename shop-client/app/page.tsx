"use client";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: any;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const json = await res.json();
      setPosts(json);
    };

    fetchPosts();
  }, []);

  const submitPost = async () => {
    try {
      if (!title || !content) {
        return;
      }
  
      const userRes = await fetch('/api/auth/userInfo', {
        credentials: 'include',
      });
  
      if (!userRes.ok) {
        console.error('Error fetching user info');
        return;
      }
      
      const obj = await userRes.json();
  
      console.log('NAME...',name)
      
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, content: content, author: obj?.user?.email }),
      });
  
      if (res.ok) {
        const json = await res.json();
        setPosts((prev) => [
          ...prev,
          { 
            title: json.title, 
            content: json.content, 
            id: json.id, 
            author: obj.IsGuest ? 'Guest' : json.author
          },
        ]);
        setContent('');
        setTitle('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const res = await fetch('/api/posts', {
        headers: { "Content-Type": "application/json" },
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
      });

      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-6 sm:p-12 bg-gray-950 font-sans text-white">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10 text-center">NestJS Testing</h1>

      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-semibold mb-4">Posts</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-md relative hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-300">{post.content}</p>
              <p className="text-gray-300">{post.author}</p>

              <button
                onClick={() => deletePost(post.id)}
                className="absolute top-3 right-4 text-red-400 hover:text-red-600 transition-colors text-lg cursor-pointer"
                aria-label="Delete post"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-16 w-full max-w-xl">
        <h2 className="text-3xl font-semibold mb-4">Add New Post</h2>
        <div className="space-y-4 w-full">
          <input
            className="bg-gray-800 p-4 border border-gray-700 rounded-xl w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
          />
          <input
            className="bg-gray-800 p-4 border border-gray-700 rounded-xl w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Post Content"
          />
        </div>
        <button
          onClick={submitPost}
          className="cursor-pointer mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
