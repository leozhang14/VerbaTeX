import axios from 'axios';

export const fetchEquationData = async ( text: string, user_id: string, instance_id: string) => {
  try {
    const response = await axios.get('https://leozhang14-backend--3001.prod1c.defang.dev/gpt-query', {
        params: {
            text,
            user_id,
            instance_id
        }
    });
    console.log('response from latex api', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching equation data:', error);
    throw error;
  }
};

export const fetchEdited = async (userId: string, equationId: string, text: string) => {
    try {
      const response = await axios.get('https://leozhang14-backend--3001.prod1c.defang.dev/gpt-query', {
        params: {
          userId,
          equationId,
          text
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching edited response:', error);
      throw error;
    }
  };
  
