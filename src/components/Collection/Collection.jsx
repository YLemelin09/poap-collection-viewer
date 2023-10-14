import React, { useState } from "react";
import { toast } from "react-toastify";

import fetchCollectionsByAddress from "../../api/fetchCollections";

import SearchBar from "../searchBar/SearchBar";
import POAPBadge from "../POAPBadge/POAPBadge";

import "./Collection.css";

const Collections = () => {
  const [address, setAddress] = useState("");
  const [collectionData, setCollectionData] = useState(null);

  const notify = (notice) => toast(notice);

  const isValidEthereumAddress = (address) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

  const isValidENS = (address) => /.+\.eth$/.test(address);

  const isValidEmail = (address) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);

  const handleFetchCollections = async () => {
    if (
      isValidEthereumAddress(address) ||
      isValidENS(address) ||
      isValidEmail(address)
    ) {
      try {
        const data = await fetchCollectionsByAddress(address);
        setCollectionData(data.deliveries);
      } catch (error) {
        notify(error);
      }
    } else {
      notify("Invalid format!");
    }
  };

  const clearCollections = () => {
    setCollectionData(null);
  };

  return (
    <div className="collection-container">
      <div className="searchBar-container">
        <SearchBar
          value={address}
          onSearch={handleFetchCollections}
          onChange={(e) => setAddress(e.target.value)}
          onClear={clearCollections}
        />
      </div>

      <div className="badges-container">
        {collectionData &&
          collectionData.map((poap) => <POAPBadge key={poap.id} poap={poap} />)}
      </div>
    </div>
  );
};

export default Collections;
