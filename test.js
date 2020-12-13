let obj = {
  info: {
    statuscode: 0,
    copyright: {
      text: "\u00A9 2020 MapQuest, Inc.",
      imageUrl: "http://api.mqcdn.com/res/mqlogo.gif",
      imageAltText: "\u00A9 2020 MapQuest, Inc.",
    },
    messages: [],
  },
  options: { maxResults: -1, thumbMaps: true, ignoreLatLngInput: false },
  results: [
    {
      providedLocation: { location: "Washington,DC" },
      locations: [
        {
          street: "",
          adminArea6: "",
          adminArea6Type: "Neighborhood",
          adminArea5: "Washington",
          adminArea5Type: "City",
          adminArea4: "District of Columbia",
          adminArea4Type: "County",
          adminArea3: "DC",
          adminArea3Type: "State",
          adminArea1: "US",
          adminArea1Type: "Country",
          postalCode: "",
          geocodeQualityCode: "A5XAX",
          geocodeQuality: "CITY",
          dragPoint: false,
          sideOfStreet: "N",
          linkId: "282772166",
          unknownInput: "",
          type: "s",
          latLng: { lat: 38.892062, lng: -77.019912 },
          displayLatLng: { lat: 38.892062, lng: -77.019912 },
          mapUrl:
            "http://www.mapquestapi.com/staticmap/v5/map?key=hl5CFvCH0GGgkLuulKNPcQ5q1bPDGvYH&type=map&size=225,160&locations=38.892062,-77.019912|marker-sm-50318A-1&scalebar=true&zoom=12&rand=-1610853356",
        },
      ],
    },
  ],
};

console.log(obj.results[0].locations[0].adminArea5)