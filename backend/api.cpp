#include <string>
#include <chrono>
#include <httplib.h>
#include <json.hpp>
#include <heap.h>
#include <hash_map.h>

int main(){
    using namespace httplib;

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

        

        nlohmann::json response;
        response["using_heap"] = std::to_string(using_heap);
        response["hotspot_count"] = std::to_string(hotspot_count);

        res.set_content(response.dump(), "application/json");
    });


    api.listen("localhost", 8080);

    return 0;
}