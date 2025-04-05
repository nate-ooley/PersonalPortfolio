export type BlogGenerationRequest = {
  topic: string;
  additionalInstructions?: string;
  tone?: 'professional' | 'casual' | 'technical' | 'inspirational';
  tags?: string[];
  generateImage?: boolean;
  provider?: AIProvider;
};

export enum AIProvider {
  OpenAI = 'openai',
  Anthropic = 'anthropic'
}

export type BlogGenerationResponse = {
  title: string;
  content: string;
  excerpt: string;
  coverImageUrl?: string;
};