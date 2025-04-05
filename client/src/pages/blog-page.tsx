import { useState } from 'react';
import { BlogSection } from '@/components/BlogSection';
import { BlogEditor } from '@/components/BlogEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PenLine, LogIn } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';

export default function BlogPage() {
  const [editorMode, setEditorMode] = useState(false);
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  // Handle creating a new post - either show editor or redirect to auth
  const handleNewPost = () => {
    if (user) {
      // User is logged in, show the editor
      setEditorMode(true);
    } else {
      // User is not logged in, redirect to auth page
      navigate('/auth');
    }
  };
  
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Blog</h1>
              <p className="text-muted-foreground">
                Thoughts, stories and ideas about Development, AI, Photography and Sailing
              </p>
            </div>
            {editorMode && user ? (
              <Button 
                onClick={() => setEditorMode(false)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>View Blog</span>
              </Button>
            ) : (
              <Button 
                onClick={handleNewPost}
                className="flex items-center gap-2"
              >
                {user ? (
                  <>
                    <PenLine className="h-4 w-4" />
                    <span>New Post</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>Login to Create Post</span>
                  </>
                )}
              </Button>
            )}
          </div>
          
          {editorMode && user ? <BlogEditor /> : <BlogSection />}
        </div>
      </div>
    </MainLayout>
  );
}