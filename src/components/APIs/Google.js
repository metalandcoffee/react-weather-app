export const Geocoding = async (city) => {
    try {
        let data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
        data = await data.json();

        //setResponseObj({ ...responseObj, address: data.results[0].formatted_address });

        if (data.status === "ZERO_RESULTS") {
            return false;
        }

        return data.results[0]; //data.results[0].geometry.location;
    } catch (e) {
        console.log(e);
    }
}
