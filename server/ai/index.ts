import { generateBlogWithOpenAI, generateImagePromptWithOpenAI, generateBlogImageWithDallE } from './openai';
import { generateBlogWithAnthropic, generateImagePromptWithAnthropic } from './anthropic';
import { AIProvider, BlogGenerationRequest, BlogGenerationResponse } from './types';
import slugify from 'slugify';

// Main function to generate blog posts using the selected AI provider
export async function generateBlogPost(
  request: BlogGenerationRequest, 
  provider: AIProvider = AIProvider.OpenAI
): Promise<BlogGenerationResponse> {
  try {
    // Generate blog content based on provider
    const blogContent = provider === AIProvider.OpenAI
      ? await generateBlogWithOpenAI(request)
      : await generateBlogWithAnthropic(request);
    
    let coverImageUrl: string | undefined;
    
    // Generate cover image if requested
    if (request.generateImage) {
      // Generate image prompt based on provider
      const imagePrompt = provider === AIProvider.OpenAI
        ? await generateImagePromptWithOpenAI(blogContent.title, request.topic)
        : await generateImagePromptWithAnthropic(blogContent.title, request.topic);
      
      // Only OpenAI has DALL-E integration built-in
      coverImageUrl = await generateBlogImageWithDallE(imagePrompt);
    }
    
    return {
      ...blogContent,
      coverImageUrl
    };
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('Failed to generate blog post');
  }
}

// Helper function to generate a slug from a blog title
export function generateSlug(title: string): string {
  return slugify(title, {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true
  });
}

// Utility function to check if API keys are available
export function checkApiKeysAvailable(): {
  openai: boolean;
  anthropic: boolean;
} {
  return {
    openai: !!process.env.OPENAI_API_KEY,
    anthropic: !!process.env.ANTHROPIC_API_KEY
  };
}