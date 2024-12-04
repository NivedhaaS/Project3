#include <filesystem>
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <unordered_map>
#include <queue>
#include <iostream>


int month_sizes[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

struct dataEntry{
    std::string name;
    char state[2];
    std::string latitude;
    std::string longitude;
};


struct location : public dataEntry{
    double temp_increase;
    int day;

    bool operator>(const location location1) const {
        if (temp_increase > location1.temp_increase) return true;
        else return false;
    }

    bool operator<(const location& location1) const {
        if (temp_increase < location1.temp_increase) return true;
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

    void printData(){
        std::cout << "Temperature Increased Per Year in " << name << ", " << state[0] << state[1] << ": " << temp_increase << std::endl;
    }
};


inline void trim(std::string& trim_str){
    trim_str.erase(trim_str.find_last_not_of(' ') + 1);
    trim_str.erase(0, trim_str.find_first_not_of(' '));
}


std::unordered_map<std::string, dataEntry> loadStations(std::string data_path = "..\\data"){
    std::unordered_map<std::string, dataEntry> station_codes;

    std::ifstream hcnStations(data_path + "\\hcn-stations.txt");
    if (!hcnStations.is_open()){
        std::cout << "missing hcn-stations.txt" << std::endl;
        return station_codes;
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


void loadData(const std::unordered_map<std::string, dataEntry>& station_codes, std::priority_queue<location>& avg_heap, std::unordered_map<std::string, location>& avg_table, std::priority_queue<location>& all_heap, std::unordered_map<std::string, location>& all_table, bool loading_all = false, std::string data_path = "..\\data"){
    data_path += "\\raw";

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
            std::vector<int> years;
            std::vector<int*> temperatures;

            while (std::getline(station_file, data_line)){
                if (data_line.substr(17, 4) == "TMAX"){
                    int year = std::stoi(data_line.substr(11, 4));  // Extract year (first 4 digits)
                    int month = std::stoi(data_line.substr(15, 2)) - 1; // Extract month


                    if (years.empty() || year != years.back()){
                        years.push_back(year);
                        int* year_temps = new int[365];
                        for (int i = 0; i < 365; i++) year_temps[i] = -9999;
                        temperatures.push_back(year_temps);
                    }

                    int day_count = 0;
                    for (int i = 0; i < month; i++) day_count += month_sizes[i];

                    for (int i = 0; i < month_sizes[month]; i++){
                        int temperature = std::stoi(data_line.substr(21 + 8 * i, 5));  // Extract temperature (next 5 digits)
                        
                        temperatures.back()[day_count] = temperature;
                        day_count++;
                    }
                }
            }



            double increase_sum = 0.0;
            int N = years.size();

            for (int i = 0; i < 365; i++){
                int point_count = N;
                int sum_x = 0;
                int sum_y = 0;
                int sum_xy = 0;
                int sum_x2 = 0;

                for (int j = 0; j < N; j++){
                    if (temperatures[j][i] != -9999){
                        sum_x += years[j];
                        sum_y += temperatures[j][i];
                        sum_xy += years[j] * temperatures[j][i];
                        sum_x2 += years[j] * years[j];
                    }
                    else point_count--;
                }

                double slope = double(point_count * sum_xy - sum_x * sum_y) / double(point_count * sum_x2 - sum_x * sum_x);
                //double intercept = (sum_y - slope * sum_x) / double(N);
                increase_sum += slope;

                if (loading_all){
                    station_location.temp_increase = slope;
                    station_location.day = i + 1;
                    all_table[file.path().stem().string() + std::to_string(i)] = station_location;
                    all_heap.push(station_location);
                }
            }

            for (int i = 0; i < N; i++) delete[] temperatures[i];

            station_location.temp_increase = increase_sum / 365.0;
            avg_table[file.path().stem().string()] = station_location;
            avg_heap.push(station_location);

            station_file.close();
        }
    }
}