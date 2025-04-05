import OpenAI from "openai";
import { BlogGenerationRequest } from "./types";

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate blog content using OpenAI
export async function generateBlogWithOpenAI(request: BlogGenerationRequest): Promise<{
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

    // Make the API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Create a blog post about "${topic}". Include a title at the beginning and use markdown formatting.` }
      ],
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: "text" }
    });

    const fullContent = response.choices[0].message.content?.trim() || '';
    
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
    console.error('Error generating blog with OpenAI:', error);
    throw new Error('Failed to generate blog post content');
  }
}

// Generate image prompt for the blog cover using OpenAI
export async function generateImagePromptWithOpenAI(blogTitle: string, topic: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
      messages: [
        { 
          role: "system", 
          content: "You are an expert at creating detailed image prompts for DALL-E that accurately represent blog topics." 
        },
        { 
          role: "user", 
          content: `Create a detailed and visually descriptive prompt for DALL-E to generate a cover image for a blog post titled "${blogTitle}" about ${topic}. The image should be professional, visually appealing, and appropriate for a personal portfolio website. Include specific details about style, perspective, colors, and mood. The prompt should be around 50-100 words.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
      response_format: { type: "text" }
    });

    return response.choices[0].message.content?.trim() || 
      `A professional and appealing image representing ${topic} for a blog titled "${blogTitle}"`;
  } catch (error) {
    console.error('Error generating image prompt with OpenAI:', error);
    return `A professional and appealing image representing ${topic} for a blog titled "${blogTitle}"`;
  }
}

// Generate blog cover image using DALL-E
export async function generateBlogImageWithDallE(imagePrompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url || '';
  } catch (error) {
    console.error('Error generating image with DALL-E:', error);
    throw new Error('Failed to generate blog cover image');
  }
}