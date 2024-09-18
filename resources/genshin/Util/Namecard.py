import json

with open("MaterialData.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    output = {}
    for i in data:
        if "materialType" in i and i["materialType"] == "MATERIAL_NAMECARD":
            output[i["id"]] = i["picPath"][1] if len(i["picPath"]) > 1 else i["picPath"][0]
    with open("Namecard.json", "w") as r:
        json.dump(output, r, indent=2)

input("Done")