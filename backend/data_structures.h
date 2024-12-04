#include <data_parse.h>
#include <queue>
#include <unordered_map>
#include <string>
#include <vector>


class DataStructures{

    std::priority_queue<location> avg_heap; //stores structure that stores location and percentage increased
    std::unordered_map<std::string, location> avg_table; //key: station_code, val: location

    std::priority_queue<location> all_heap;
    std::unordered_map<std::string, location> all_table;

    public:

    DataStructures(bool loading_all = false, std::string data_path = "..\\data"){
        std::unordered_map<std::string, dataEntry> station_codes = loadStations(data_path);

        loadData(station_codes, avg_heap, avg_table, all_heap, all_table, loading_all, data_path);
    }
    
    std::vector<location> getKAvgHotspots(int K, bool using_heap){
        std::vector<location> top_hotspots;

        if (using_heap){
            for (int i = 0; (i < K && !avg_heap.empty()); i++){
                top_hotspots.push_back(avg_heap.top());
                avg_heap.pop();
            }
            for (location hotspot : top_hotspots) avg_heap.push(hotspot);
        }


        else { //using table (linear search)
            for (auto iter1 = avg_table.begin(); iter1 != avg_table.end(); iter1++){
                bool placed = false;
                for (auto iter2 = top_hotspots.begin(); iter2 != top_hotspots.end(); iter2++){
                    if (iter1->second > *iter2){
                        top_hotspots.insert(iter2, iter1->second);
                        placed = true;
                        break;
                    }
                }
                if (!placed && top_hotspots.size() < K) top_hotspots.push_back(iter1->second);
                if (top_hotspots.size() > K) top_hotspots.pop_back();
            }
        }

        return top_hotspots; 
    }

    std::vector<location> getKAllHotspots(int K, bool using_heap){
        std::vector<location> top_hotspots;

        if (using_heap){
            for (int i = 0; (i < K && !all_heap.empty()); i++){
                top_hotspots.push_back(all_heap.top());
                all_heap.pop();
            }
            for (location hotspot : top_hotspots) all_heap.push(hotspot);
        }


        else { //using table (linear search)
            for (auto iter1 = all_table.begin(); iter1 != all_table.end(); iter1++){
                bool placed = false;
                for (auto iter2 = top_hotspots.begin(); iter2 != top_hotspots.end(); iter2++){
                    if (iter1->second > *iter2){
                        top_hotspots.insert(iter2, iter1->second);
                        placed = true;
                        break;
                    }
                }
                if (!placed && top_hotspots.size() < K) top_hotspots.push_back(iter1->second);
                if (top_hotspots.size() > K) top_hotspots.pop_back();
            }
        }

        return top_hotspots; 
    }

    int getAvgSize(){
        if (avg_heap.size() == avg_table.size()) return avg_heap.size();
        else return -1;
    }

    int getAllSize(){
        if (all_heap.size() == all_table.size()) return all_heap.size();
        else return -1;
    }
};