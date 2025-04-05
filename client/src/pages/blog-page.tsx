import { useState } from 'react';
import { BlogSection } from '@/components/BlogSection';
import { BlogEditor } from '@/components/BlogEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PenLine, BookOpen } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

export default function BlogPage() {
  const [editorMode, setEditorMode] = useState(false);
  
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
            <Button 
              onClick={() => setEditorMode(!editorMode)}
              className="flex items-center gap-2"
            >
              {editorMode ? (
                <>
                  <ArrowLeft className="h-4 w-4" />
                  <span>View Blog</span>
                </>
              ) : (
                <>
                  <PenLine className="h-4 w-4" />
                  <span>New Post</span>
                </>
              )}
            </Button>
          </div>
          
          {editorMode ? <BlogEditor /> : <BlogSection />}
        </div>
      </div>
    </MainLayout>
  );
}