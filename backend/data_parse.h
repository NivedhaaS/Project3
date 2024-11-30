#include <filesystem>
#include <fstream>
#include <string>
#include <vector>
#include <unordered_map>
#include <queue>
#include <iostream>

struct dataEntry{
    std::string name;
    char state[2];
    std::string latitude;
    std::string longitude;
};



struct location : public dataEntry{
    double percentage_increased;

    bool operator>(location const& location1){
        if (percentage_increased > location1.percentage_increased) return true;
        else return false;
    }

    location& operator=(const dataEntry& data_entry){
        name = data_entry.name;
        state[0] = data_entry.state[0];
        state[1] = data_entry.state[1];
        latitude = data_entry.latitude;
        longitude = data_entry.longitude;
        return *this;
    }
};



inline void trim(std::string& trim_str){
    trim_str.erase(trim_str.find_last_not_of(' ') + 1);
    trim_str.erase(0, trim_str.find_first_not_of(' '));
}



std::unordered_map<std::string, dataEntry> loadStations(std::string data_path = "../data"){
    std::unordered_map<std::string, dataEntry> station_codes;

    std::ifstream hcnStations(data_path + "/hcn-stations.txt");
    if (!hcnStations){
        std::cout << "missing hcn-stations.txt" << std::endl;
        return;
    }

    std::string station;
    while (std::getline(hcnStations, station)){
        dataEntry station_data;
        station_data.name = station.substr(41, 30);
        station_data.state[0] = station.at(38);
        station_data.state[1] = station.at(39);
        station_data.latitude = station.substr(12, 8);
        station_data.longitude = station.substr(21, 9);

        trim(station_data.name);
        trim(station_data.longitude);
        trim(station_data.latitude);

        station_codes[station.substr(0, 11)] = station_data;
    }

    hcnStations.close();
    return station_codes;
};



void loadData(std::string data_path = "../data", const std::unordered_map<std::string, dataEntry>& station_codes, std::priority_queue<location>& heap, std::unordered_map<std::string, location>& table){
    data_path += "/rawtest";

    if (!std::filesystem::exists(data_path) || !std::filesystem::is_directory(data_path)) {
        std::cout << "Folder does not exist or is not a directory: " << data_path << std::endl;
        return;
    }
    
    for (auto file : std::filesystem::directory_iterator(data_path)){
        if (file.path().extension().string() == ".dly"){
            std::fstream station_file(file.path().string());

            location station_location;
            station_location = station_codes.at(file.path().stem().string());

            std::string data_line;
            while (std::getline(station_file, data_line)){
                if (data_line.substr(17, 4) == "TMAX"){
                    //to-do: implement math to calculate regression of temp vs year


                }
                else continue;
            }


            station_file.close();
        }

    }
}