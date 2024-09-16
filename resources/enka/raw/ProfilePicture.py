import json

with open("ProfilePictureData.json", "r") as f:
    data = json.load(f)
    output = {}
    for i in data:
        output[i["id"]] = i["iconPath"]
    with open("profile.json", "w") as r:
        json.dump(output, r, indent=2)

input("Done")