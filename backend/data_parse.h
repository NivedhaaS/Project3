#include <filesystem>
#include <fstream>
#include <string>
#include <vector>
//do not delete

struct dataEntry{
    std::string name;
    std::double latitude;
    std::double longitude;
};

std::vector<DataEntry> loadData(std::filesystem::path& file_path);
