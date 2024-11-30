#include <data_parse.h>
#include <queue>
#include <unordered_map>
#include <string>
#include <vector>


class DataStructures{

    std::priority_queue<location> heap; //stores structure that stores location and percentage increased
    std::unordered_map<std::string, location> table; //key: station_code, val: location

    public:

    DataStructures(bool loading_from_file = false, std::string data_path = "../data"){
        if (!loading_from_file){
            std::unordered_map<std::string, dataEntry> station_codes = loadStations(data_path);

            loadData(data_path, station_codes, heap, table);
        }
    }
    
    std::vector<location> getKTopHotspots(int K, bool using_heap){
        std::vector<location> top_hotspots;

        if (using_heap){
            for (int i = 0; (i < K && !heap.empty()); i++){
                top_hotspots.push_back(heap.top());
                heap.pop();
            }
            for (location hotspot : top_hotspots) heap.push(hotspot);
        }


        else { //using table (linear search)
            for (auto iter1 = table.begin(); iter1 != table.end(); iter1++){
                bool placed = false;
                for (auto iter2 = top_hotspots.begin(); iter2 != top_hotspots.end(); iter2++){
                    if (iter1->second > *iter2) top_hotspots.emplace(iter2, iter1->second);
                    placed = true;
                    break;
                }
                if (!placed && top_hotspots.size() < K) top_hotspots.push_back(iter1->second);
                if (top_hotspots.size() > K) top_hotspots.pop_back();
            }
        }

        return top_hotspots; 
    }
};