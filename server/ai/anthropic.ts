import Anthropic from '@anthropic-ai/sdk';
import { BlogGenerationRequest } from './types';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Generate blog content using Anthropic
export async function generateBlogWithAnthropic(request: BlogGenerationRequest): Promise<{
  title: string;
  content: string;
  excerpt: string;
}> {
  try {
    const { topic, additionalInstructions, tone } = request;

    // Format the system prompt
    const systemPrompt = `You are a professional blog writer specializing in ${topic}. 
Create a well-structured, informative blog post written in a ${tone || 'professional'} tone.
The blog should include:
- An engaging title
- A compelling introduction
- Well-organized body sections with appropriate headings
- A concise conclusion
- Use markdown formatting for the content

${additionalInstructions ? `Additional instructions: ${additionalInstructions}` : ''}`;

    // Make the API call to Anthropic
    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219', // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
      max_tokens: 2500,
      system: systemPrompt,
      messages: [
        { 
          role: 'user', 
          content: `Create a blog post about "${topic}". Include a title at the beginning and use markdown formatting.` 
        }
      ],
    });

    // Handle different content types (text or tool use)
    const fullContent = 'text' in response.content[0] 
      ? response.content[0].text.trim()
      : 'Unable to generate content';
    
    // Extract title from the content (typically the first line)
    const titleMatch = fullContent.match(/^#\s+(.+)$/m) || fullContent.match(/^(.+)[\r\n]/);
    const title = titleMatch ? titleMatch[1] : 'Untitled Blog Post';
    
    // Create an excerpt (first paragraph after the title)
    let contentWithoutTitle = fullContent.replace(/^#\s+(.+)$/m, '').trim();
    const paragraphs = contentWithoutTitle.split('\n\n');
    const excerpt = paragraphs[0].replace(/^[#\s]+/, '').substring(0, 155) + '...';
    
    return {
      title,
      content: fullContent,
      excerpt
    };
  } catch (error) {
    console.error('Error generating blog with Anthropic:', error);
    throw new Error('Failed to generate blog post content');
  }
}

// Generate image prompt for the blog cover using Anthropic
export async function generateImagePromptWithAnthropic(blogTitle: string, topic: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219', // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
      max_tokens: 300,
      system: 'You are an expert at creating detailed image prompts that accurately represent blog topics.',
      messages: [
        { 
          role: 'user', 
          content: `Create a detailed and visually descriptive prompt to generate a cover image for a blog post titled "${blogTitle}" about ${topic}. The image should be professional, visually appealing, and appropriate for a personal portfolio website. Include specific details about style, perspective, colors, and mood. The prompt should be around 50-100 words.` 
        }
      ],
    });

    return 'text' in response.content[0]
      ? response.content[0].text.trim()
      : `A professional and appealing image representing ${topic} for a blog titled "${blogTitle}"`;
  } catch (error) {
    console.error('Error generating image prompt with Anthropic:', error);
    return `A professional and appealing image representing ${topic} for a blog titled "${blogTitle}"`;
  }
}