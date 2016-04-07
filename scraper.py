from bs4 import BeautifulSoup
import json
import requests
CHAMPIONS_JSON = open('data/champions.json','r').read()
CHAMPIONS = json.loads(CHAMPIONS_JSON)

BASE_URL = "http://www.lolcounter.com/champions/"
COUNTERS_CHAMPIONS = {}
def scrape(champion):
    try:
        if champion == 'MonkeyKing':
            champion = 'Wukong'
        req = requests.get(BASE_URL+champion)
        data = req.text
        soup = BeautifulSoup(data, "lxml")
        counters = soup.select('._all .weak-block .champ-block')
        results = []
        for counter in counters:
            results.append(counter.find(class_='name').text)
        COUNTERS_CHAMPIONS[champion] = results
        print 'finished ', champion, " with ", results
    except Exception as e:
        return None

# for key in CHAMPIONS['data']:
#     scrape(key)
#
# with open('data/champion_counters.json','w') as fp:
#     json.dump(COUNTERS_CHAMPIONS, fp, indent=4)

# CHAMPIONS_ID = {}
# for key, value in CHAMPIONS['data'].iteritems():
#     CHAMPIONS_ID[value['id']] = key
#
# with open('data/champion_by_id.json', 'w') as fp2:
#     json.dump(CHAMPIONS_ID, fp2, indent=4)

TEMP3 = {}
TEMP4 = json.load(open('data/champion_counters.json'))
for key in TEMP4:
    counterIDs = [CHAMPIONS['data'][counter]['id'] for counter in TEMP4[key]]
    TEMP3[CHAMPIONS['data'][key]['id']] = counterIDs

with open('data/champion_counters_id.json','w') as fp3:
    json.dump(TEMP3, fp3, indent=4)
