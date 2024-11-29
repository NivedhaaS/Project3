#include <string>
#include <vector>
#include <chrono>
#include <httplib.h>
#include <json.hpp>
#include <data_structures.h>

int main(){
    using namespace httplib;

    DataStructures structures;

    Server api;
    
    api.Get("/api", [](const Request& req, Response&res){

        auto data_structure = req.get_param_value("data_structure");
        auto hotspots = req.get_param_value("hotspots");

        int hotspot_count;
        try {hotspot_count = std::stoi(hotspots);}
        catch (std::exception& error) {return;}

        bool using_heap;
        if (data_structure == "heap") using_heap = true;
        else if (data_structure == "table") using_heap = false;
        else return;

        vector<location> topKHotspots = structures.getKTopHotspots(hotspot_count, using_heap);

        nlohmann::json response;
        response["using_heap"] = std::to_string(using_heap);
        response["hotspot_count"] = std::to_string(hotspot_count);

        for (location hotspot : topKHotspots){
            //response[hotspot.name] = 
        }

        res.set_content(response.dump(), "application/json");
    });


    api.listen("localhost", 8080);

    return 0;
}