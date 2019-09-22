import uuid from 'uuid';
import axios from 'axios';

// ADD_STAR
export const addStar = (
    {
      starName = 'Uknown Star',
      centralEnergyDensity = '0',
      labelForSecondInput = '',
      valueForSecondInput = '0',
      eosFile = 'eosC',
      model = 'model',
      measurements = '0',
      limit = 'none',
      limitValue = '0',
      readingsIgnored = false
    } = {}
  ) => ({
    type: 'ADD_STAR',
    star: {
      id: uuid(),
      starName,
      centralEnergyDensity,
      labelForSecondInput,
      valueForSecondInput,
      eosFile,
      model,
      measurements,
      limit,
      limitValue,
      readingsIgnored
    }
  });
// REMOVE_STAR
export const removeStar = ({ id } = {}) => ({
    type: 'REMOVE_STAR',
    id  
});
// EDIT_STAR
export const editStar = (id, updates) => ({
    type: 'EDIT_STAR',
    id,
    updates
});

export const getEosFiles = () => {
    return axios.get('http://localhost:4000/eos')
    .then((res) => {
        return (res.data);               
    })
    .catch((err) => {
        // console.log(err);
        console.log('Error:', err.response);
        
    })
};

export const sendModelsData = async (stars) => {
    console.log('stars in sendModelsData:', stars);
    try {
        const res = await axios.post(`http://localhost:4000/stars/${ stars.id }`, stars.starModels);
        console.log('Success');
        console.log(res.data);
        console.log(res.status);
        console.log(res.statusText);
        return (res.data); //Send back to client
    }
    catch (err) {
        console.log('Error');
        console.log('Error response:', err.response);
        return (err.response);
    }
};
