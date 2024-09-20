import MaterialResourceJson from "../../resources/genshin/Data/MaterialData.json";

interface MaterialJsonStruct {
    interactionTitleTextMapHash: number;
    noFirstGetHint: boolean;
    itemUse: { useOp?: string; useParam: string[] }[];
    rankLevel: number;
    effectDescTextMapHash: number;
    specialDescTextMapHash: number;
    typeDescTextMapHash: number;
    effectIcon: string;
    effectName: string;
    picPath: string[];
    isSplitDrop?: boolean;
    satiationParams: any[];
    destroyRule?: string;
    destroyReturnMaterial: any[];
    destroyReturnMaterialCount: any[];
    UNDEFINEDINT?: number;
    id: number;
    nameTextMapHash: number;
    descTextMapHash: number;
    icon: string;
    itemType: string;
    weight?: number;
    rank: number;
    gadgetId?: number;
}

interface TextMapJsonStruct {
    [hash: string]: string
}


const MaterialJsonData: MaterialJsonStruct[] = MaterialResourceJson as MaterialJsonStruct[];


export class MaterialData {
    
    public static getMaterial(id: number): MaterialJsonStruct | false {
        return MaterialJsonData.find(s => s.id === id) || false;
    }

    public static getIcon(name: string): string {
        return `https://api.hakush.in/gi/UI/${name}.webp`
    }

}

export class TextMapData {

    language: string;

    constructor(language: string) {
        this.language = language;
    }

    public async getLanguage(): Promise<TextMapJsonStruct> {
        const TextMap = await import(`../../resources/genshin/TextMap/TextMap${this.language}.json`) as TextMapJsonStruct;
        return TextMap;
    }

    public async getText(hash: number): Promise<string> {
        const hashStr = hash.toString();
        const TextMap = await this.getLanguage();
        if (TextMap[hashStr]) {
            return TextMap[hashStr];
        }
        return "???";
    }

}