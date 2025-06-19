import axiosClient from '../utils/axiosClient';

const TourTypeService = {

    getTourTypes : async () => {
        try {
            const result = await axiosClient.get("/tour-types")
            return result.response
        } catch (err){
            console.log("Error fetching tour types", err);
            return [];
        }
    }
}
export default TourTypeService