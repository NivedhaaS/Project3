#include <data_parse.h>
#include <queue>
#include <unordered_map>
#include <string>
#include <vector>

struct location{
    std::string name;
    std::string longitude;
    std::string latitude;
    double percentage_increased;

    bool operator>(location const& location1, location const& location2){
        if (location1.percentage_increased > location2.percentage_increased) return true;
        else return false;
    }
};

class DataStructures{

    std::priority_queue<location> heap; //stores structure that stores location and percentage increased
    std::unordered_map<std::string, double> table; //key: location, val: percentage increased

    public:
    
    std::vector<location> getKTopHotspots(int K, bool using_heap){
        std::vector<location> top_hotspots;

        if(using_heap){
            auto heap_copy = heap; //so that the original heap does not get modified
            while(K-> 0 && !heap_copy.empty()){
                top_hotspots.push_back(heap_copy.top());
                heap_copy.pop();
            }
        }
        else{
            //Sort using a vector? to get the top K value
        }

        return top_spots; 
    }
};