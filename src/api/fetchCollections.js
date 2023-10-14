import axios from "axios";

const API_KEY =
  "MmClnHY37oiqAU4C0HHSy02JshTsxAzSzQ5ZEqpb7XAeFUPc0DNTLD1sL7lxHIQyOb9c5pY5DizcGs8blLstpkUtjrsP4hoOIlasVtnAQ50mWFuQ36qefNB0cwZmBvSp";

const fetchCollectionsByAddress = async (address) => {
  try {
    const response = await axios.get("https://api.poap.tech/deliveries", {
      headers: {
        "X-API-Key": API_KEY,
        Accept: "application/json",
      },
      params: {
        address,
        limit: 100,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default fetchCollectionsByAddress;
