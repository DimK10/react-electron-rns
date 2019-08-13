// Get visible stars
export default (stars, { text, sortBy }) => {
    return stars.filter((star) => {
        const textMatch = star.starName.toLowerCase().includes(text.toLowerCase());
        const modelMatch = star.model.toLowerCase().includes(text.toLowerCase());
        
        return modelMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'name'){
            return a.starName.toLowerCase() < b.starName.toLowerCase() ? 1 : -1; // Sort to most recent one
        }else if(sortBy === 'model') {
            return a.model.toLowerCase() < b.model.toLowerCase() ? 1 : -1;
        }
    });
};