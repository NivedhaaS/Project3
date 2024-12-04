#include <string>
#include <iostream>
#include <vector>
#include <chrono>
#include <httplib.h>
#include <json.hpp>
#include <data_structures.h>

int main(){


    //Load all data or only average data
    bool loading_all_data = true;
    //Path to data folder
    std::string data_path = "..\\data";



    DataStructures structures(loading_all_data, data_path);
    std::cout << "Finished loading data on " << structures.getAllSize() << " locations" << std::endl;



    httplib::Server api;    
    api.Get("/api", [&structures](const httplib::Request& req, httplib::Response&res){
        //Get Data Structure Parameters
        std::string data_structure = req.get_param_value("data_structure");
        std::string hotspots = req.get_param_value("hotspots");
        std::string data_mode = req.get_param_value("data_mode");

        int hotspot_count;
        try {hotspot_count = std::stoi(hotspots);}
        catch (std::exception& error) {return;}

        bool using_heap = true;
        if (data_structure == "table") using_heap = false;

        bool using_all = false;
        if (data_mode == "all") using_all = true;



        //Execute Search and Measure Time
        auto time1 = std::chrono::high_resolution_clock::now();
        std::vector<location> topKHotspots = using_all ? structures.getKAllHotspots(hotspot_count, using_heap) : structures.getKAvgHotspots(hotspot_count, using_heap);
        auto time2 = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double, std::milli> difference = time2 - time1;



        //Generate Response JSON
        nlohmann::json response;
        response["data"] = nlohmann::json::array();
        int rank = 1;

        for (location hotspot : topKHotspots){
            nlohmann::json hotspot_json;
            hotspot_json["rank"] = rank;
            hotspot_json["name"] = hotspot.name;
            hotspot_json["state"] = std::string(hotspot.state).substr(0, 2);
            hotspot_json["longitude"] = hotspot.longitude;
            hotspot_json["latitude"] = hotspot.latitude;
            hotspot_json["temp_incrs/yr"] = hotspot.temp_increase;
            if (using_all){
                int day = hotspot.day;
                int month = 0;
                for (month; month < 12 && (day - month_sizes[month] > 0); month++) day -= month_sizes[month];
                hotspot_json["month"] = month + 1;
                hotspot_json["day"] = day;
            };
            response["data"].push_back(hotspot_json);
            rank++;
        }
        response["duration"] = difference.count();

        res.set_content(response.dump(4), "application/json");
    });


    api.listen("localhost", 8080);


    return 0;
}