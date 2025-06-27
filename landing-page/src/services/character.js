import axiosClient from '../utils/axiosClient';

const CharacterService = {
  getAllCharacter: async () => {
    try {
        
      const response = await axiosClient.get('/audio-characters');
      return response;
    } catch (error) {
      console.error('Error get all character:', error);
      throw error;
    }
  },

}
export default CharacterService