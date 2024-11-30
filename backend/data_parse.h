#include <filesystem>
#include <fstream>
#include <string>
#include <vector>

struct dataEntry{
    char[11] station_code;
    std::string name;
    char[2] state;
    std::string latitude;
    std::string longitude;
};

std::vector<DataEntry> loadData(std::filesystem::path& file_path){};
