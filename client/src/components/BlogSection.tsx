import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { BlogPost } from '@shared/schema';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Fetch blog posts
  const { data: blogPosts, isLoading, error } = useQuery<{ success: boolean, data: BlogPost[] }>({
    queryKey: ['/api/blog'],
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-semibold text-destructive">Failed to load blog posts</h3>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }
  
  if (!blogPosts?.data || blogPosts.data.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-semibold">No blog posts yet</h3>
        <p className="text-muted-foreground">Check back soon for new content!</p>
      </div>
    );
  }
  
  // Function to render the full blog post
  const renderFullPost = () => {
    if (!selectedPost) return null;
    
    return (
      <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => setSelectedPost(null)}
        >
          ← Back to all posts
        </Button>
        
        {selectedPost.coverImage && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <img 
              src={selectedPost.coverImage} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mt-6 mb-2">{selectedPost.title}</h1>
        
        <div className="flex gap-2 mb-8">
          {selectedPost.tags && selectedPost.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(selectedPost.content) }}
        />
      </div>
    );
  };
  
  // Show the full post if one is selected
  if (selectedPost) {
    return renderFullPost();
  }
  
  // Otherwise, show the list of posts
  return (
    <div className="container py-8">
      <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.data.map((post) => (
          <Card key={post.id} className="h-full flex flex-col">
            <CardHeader>
              {post.coverImage && (
                <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              )}
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Unpublished'}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => setSelectedPost(post)}
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Helper function to convert markdown to HTML (basic implementation)
function formatMarkdown(markdown: string): string {
  // This is a very simple markdown formatter
  // For a real implementation, use a proper markdown library
  
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    
    // Bold and italics
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Lists
    .replace(/^\s*\*\s*(.*$)/gm, '<li>$1</li>')
    
    // Paragraphs (convert double newlines to paragraph tags)
    .replace(/\n\n/g, '</p><p>');
  
  // Wrap in paragraph tags if not already
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>';
  }
  
  return html;
}