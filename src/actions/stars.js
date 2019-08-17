import uuid from 'uuid';

// ADD_STAR
export const addStar = (
    {
      starName = 'Uknown Star',
      centralEnergyDensity = 0,
      tolerance = 0,
      labelForSecondInput = '',
      valueForSecondInput = 0,
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
      model,
      measurements,
      limit,
      limitValue,
      readingsIgnored,
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

const handleResponse =(response) => {
  if(response.ok) {
    return response.json()
  }else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// export const saveDataToDb = (data) => {
//   const newData = JSON.stringify(data)
//   console.log(newData);
//   return fetch('/stars', {
//     method: 'POST',
//     mode: 'cors',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin':'*'
//     }
//   }).then(handleResponse)

// }

