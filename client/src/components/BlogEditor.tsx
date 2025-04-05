import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { insertBlogPostSchema, InsertBlogPost } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

// Extended schema for validation
const blogPostFormSchema = insertBlogPostSchema.extend({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  tags: z.array(z.string()).min(1, 'Add at least one tag'),
});

// Typing for AI-generated blog
type GeneratedBlog = {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  tags: string[];
};

export function BlogEditor() {
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiForm, setAiForm] = useState({
    topic: '',
    additionalInstructions: '',
    tone: 'professional',
    generateImage: true,
  });
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlog | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Check which AI providers are available
  const { data: aiProviders } = useQuery<{ success: boolean, data: { openai: boolean, anthropic: boolean } }>({
    queryKey: ['/api/blog/ai-providers'],
  });
  
  // Form setup
  const form = useForm<z.infer<typeof blogPostFormSchema>>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      tags: [],
      published: false,
      coverImage: '',
    },
  });
  
  // Mutation for creating blog posts
  const createBlogMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      const res = await apiRequest('POST', '/api/blog', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({
        title: 'Blog post created',
        description: 'Your blog post has been published successfully!',
      });
      form.reset();
      setGeneratedBlog(null);
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create blog post',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Submit handler
  const onSubmit = (data: z.infer<typeof blogPostFormSchema>) => {
    createBlogMutation.mutate(data);
  };
  
  // Generate blog with AI
  const generateBlogWithAI = async () => {
    if (!aiForm.topic) {
      toast({
        title: 'Topic is required',
        description: 'Please enter a topic for your blog post.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setAiGenerating(true);
      
      // Determine which provider to use (default to OpenAI if available)
      const provider = aiProviders?.data.openai 
        ? 'openai' 
        : aiProviders?.data.anthropic 
          ? 'anthropic' 
          : undefined;
      
      if (!provider) {
        toast({
          title: 'No AI provider available',
          description: 'Neither OpenAI nor Anthropic API keys are configured.',
          variant: 'destructive',
        });
        return;
      }
      
      const res = await apiRequest('POST', '/api/blog/generate', {
        topic: aiForm.topic,
        additionalInstructions: aiForm.additionalInstructions,
        tone: aiForm.tone,
        generateImage: aiForm.generateImage,
        provider,
        tags: [aiForm.topic.split(' ')[0].toLowerCase()],
      });
      
      const result = await res.json();
      
      if (result.success) {
        setGeneratedBlog(result.data);
        
        // Populate the form with the generated content
        form.setValue('title', result.data.title);
        form.setValue('slug', result.data.slug);
        form.setValue('content', result.data.content);
        form.setValue('excerpt', result.data.excerpt);
        form.setValue('tags', result.data.tags);
        form.setValue('coverImage', result.data.coverImage);
        
        toast({
          title: 'Blog post generated',
          description: 'Your blog post has been generated successfully!',
        });
      } else {
        toast({
          title: 'Failed to generate blog post',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error generating blog post',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setAiGenerating(false);
    }
  };
  
  // Handle input changes for AI form
  const handleAiInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAiForm((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle switch change for AI form
  const handleSwitchChange = (checked: boolean) => {
    setAiForm((prev) => ({ ...prev, generateImage: checked }));
  };
  
  // Function to render preview
  const renderPreview = () => {
    const formValues = form.getValues();
    
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        {formValues.coverImage && (
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
            <img 
              src={formValues.coverImage} 
              alt={formValues.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{formValues.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {formValues.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-muted-foreground mb-8">
          {formValues.excerpt}
        </div>
        
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(formValues.content) }}
        />
      </div>
    );
  };
  
  // Rendering the main editor
  return (
    <div className="container py-8 max-w-7xl">
      <h2 className="text-3xl font-bold mb-2">Blog Editor</h2>
      <p className="text-muted-foreground mb-6">Create and publish new blog posts</p>
      
      <Tabs defaultValue="form">
        <TabsList className="mb-4">
          <TabsTrigger value="form">Editor</TabsTrigger>
          <TabsTrigger value="ai">AI Generator</TabsTrigger>
          <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Blog Post Editor</CardTitle>
              <CardDescription>Fill in the details for your new blog post</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter blog title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a brief summary of your post"
                            className="resize-none"
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content (Markdown)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your blog post using markdown"
                            className="resize-none"
                            rows={15}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. development, ai, photography"
                            value={field.value?.join(', ') || ''}
                            onChange={(e) => {
                              const tags = e.target.value
                                .split(',')
                                .map((tag) => tag.trim())
                                .filter((tag) => tag !== '');
                              field.onChange(tags);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Publish</FormLabel>
                          <FormDescription>
                            Make this blog post visible to visitors
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={createBlogMutation.isPending}
                  >
                    {createBlogMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {createBlogMutation.isPending ? 'Publishing...' : 'Publish Blog Post'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>AI Blog Generator</CardTitle>
              <CardDescription>Generate a blog post using AI</CardDescription>
            </CardHeader>
            <CardContent>
              {!aiProviders?.data?.openai && !aiProviders?.data?.anthropic && (
                <div className="bg-muted p-4 rounded-md mb-6">
                  <p className="text-sm text-muted-foreground">
                    No AI providers are configured. Please set up either OPENAI_API_KEY or ANTHROPIC_API_KEY.
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic</label>
                  <Input
                    name="topic"
                    value={aiForm.topic}
                    onChange={handleAiInputChange}
                    placeholder="e.g. AI in Modern Web Development"
                    disabled={aiGenerating || (!aiProviders?.data?.openai && !aiProviders?.data?.anthropic)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tone</label>
                  <Select 
                    name="tone"
                    value={aiForm.tone}
                    onValueChange={(value) => setAiForm((prev) => ({ ...prev, tone: value }))}
                    disabled={aiGenerating || (!aiProviders?.data?.openai && !aiProviders?.data?.anthropic)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Instructions (Optional)</label>
                  <Textarea
                    name="additionalInstructions"
                    value={aiForm.additionalInstructions}
                    onChange={handleAiInputChange}
                    placeholder="Additional instructions for the AI (e.g. focus on specific aspects, include examples, etc.)"
                    rows={3}
                    disabled={aiGenerating || (!aiProviders?.data?.openai && !aiProviders?.data?.anthropic)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="generate-image"
                    checked={aiForm.generateImage}
                    onCheckedChange={handleSwitchChange}
                    disabled={aiGenerating || !aiProviders?.data?.openai}
                  />
                  <label 
                    htmlFor="generate-image" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Generate Cover Image
                  </label>
                </div>
                
                {!aiProviders?.data?.openai && aiForm.generateImage && (
                  <p className="text-xs text-muted-foreground">
                    Note: Image generation requires OpenAI API key
                  </p>
                )}
                
                <Button
                  onClick={generateBlogWithAI}
                  disabled={aiGenerating || !aiForm.topic || (!aiProviders?.data?.openai && !aiProviders?.data?.anthropic)}
                  className="w-full md:w-auto"
                >
                  {aiGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {aiGenerating ? 'Generating...' : 'Generate Blog Post'}
                </Button>
              </div>
              
              {generatedBlog && (
                <Accordion type="single" collapsible className="mt-8">
                  <AccordionItem value="preview">
                    <AccordionTrigger>View Generated Blog</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 mt-2">
                        <h3 className="text-xl font-bold">{generatedBlog.title}</h3>
                        
                        {generatedBlog.coverImage && (
                          <div className="aspect-video w-full overflow-hidden rounded-md">
                            <img 
                              src={generatedBlog.coverImage} 
                              alt={generatedBlog.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <p className="text-muted-foreground">{generatedBlog.excerpt}</p>
                        
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            // Switch to editor tab
                            const formTab = document.querySelector('[data-value="form"]') as HTMLElement;
                            if (formTab) formTab.click();
                          }}
                        >
                          Edit in Form
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          {previewMode && renderPreview()}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper function to format markdown (same as in BlogSection.tsx)
function formatMarkdown(markdown: string): string {
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