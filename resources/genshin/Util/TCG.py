import json

with open("D:/Lyuu/Discord bots/omgtypescript/resources/genshin/TextMap/TextMapEN.json", "r", encoding="utf-8") as r: # lol
    global textmap 
    textmap = json.load(r)

def getName(hash):
    return textmap.get(str(hash), "? ? ?")


with open("MaterialData.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    output = []
    for i in data:
        if i["icon"].startswith("UI_Gcg"):
            type = ""
            if "Char" in i["icon"]:
                type = "Card_"+i["icon"].split("_")[4] # NPC/Location/Etc
            elif "Assist" in i["icon"]:
                type = "Assist_"+i["icon"].split("_")[4] # NPC/Location/Etc
            elif "Modify" in i["icon"]:
                type = "Modify_"+i["icon"].split("_")[4] # Talent/Artifact/Weapon/Etc
            elif "Event" in i["icon"]:
                type = "Event_"+i["icon"].split("_")[4] # Food/Event
            else:
                type = i["icon"].split("_")[2] # Cardbacks/Etc
            output.append({"id": i["id"], "name": getName(i["nameTextMapHash"]), "icon": i["icon"], "release": False, "type": type})
    with open("TCGData.json", "w") as r:
        json.dump(output, r, indent=2)

input("Done")