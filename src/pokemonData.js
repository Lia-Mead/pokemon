
import React, { useState, useEffect } from "react";

const PokemonData = () => {

    const [totalReactPackages, setTotalReactPackages] = useState(null);
    
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch("https://pokeapi.co/")
            .then((response) => response.json())
            .then((data) => setTotalReactPackages(data.total));
    
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

        return (
            <div className="card text-center m-3">
                <h5 className="card-header">GET Request with React Hooks</h5>
                <div className="card-body">
                    Total react packages: {totalReactPackages}
                </div>
            </div>
        );

}

export default PokemonData;


// module.exports.getTweets = function (bearerToken, callback) {
//     // const screenName = "Oprah";
//     const screenName = "boilerroomtv";
//     const reqTwitt = {
//         method: "GET",
//         host: "api.twitter.com",
//         path: `/1.1/statuses/user_timeline.json?screen_name=${screenName}&tweet_mode=extended`,
//         headers: {
//             Authorization: `Bearer ${bearerToken}`,
//         },
//     };
//     // console.log("reqTwitt: ", reqTwitt);

//     function resTweetCallback(res) {
//         if (res.statusCode !== 200) {
//             callback(res.statusCode);
//             return;
//         }
//         let tweetArray = [];
//         res.on("data", (chunk) => (tweetArray += chunk));
//         res.on("end", () => {
//             const parsedTweet = JSON.parse(tweetArray);
//             // console.log("parsedTweet: ", parsedTweet);
//             callback(null, parsedTweet);
//         });
//     }
//     const req = https.request(reqTwitt, resTweetCallback);
//     req.end();
// };