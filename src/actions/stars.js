import uuid from 'uuid';
import axios from 'axios';

// ADD_STAR
export const addStar = (
    {
      starName = 'Uknown Star',
      centralEnergyDensity = 0,
      tolerance = 0,
      labelForSecondInput = '',
      valueForSecondInput = 0,
      eosFile = 'eosC',
      model = 'model',
      measurements = 'measurements',
      limit = 'none',
      limitValue = 0,
      readingsIgnored = 0
    } = {}
  ) => ({
    type: 'ADD_STAR',
    star: {
      id: uuid(),
      starName,
      centralEnergyDensity,
      tolerance,
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
        return err.data;
        
    })
};