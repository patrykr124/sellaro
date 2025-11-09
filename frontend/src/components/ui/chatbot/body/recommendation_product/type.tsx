export interface product_type {
    id: number;
    name: string;
    description: string;
    image: string;
    createdAt?: string;
  }
  
  export interface message_chat_type {
    content: string;
    createdAt: string;
    role: string;
    id: string;
    products?: product_type[];
  }